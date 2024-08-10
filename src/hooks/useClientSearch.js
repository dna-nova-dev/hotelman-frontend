import { useState, useEffect, useCallback } from "react";

// Nodo del Trie
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.client = null;
    }
}

// Implementación del Trie
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(client, key) {
        let node = this.root;
        for (let char of key.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.client = client;
    }

    search(prefix) {
        let node = this.root;
        for (let char of prefix.toLowerCase()) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this.collectAllClients(node);
    }

    collectAllClients(node) {
        let results = [];
        if (node.isEndOfWord) {
            results.push(node.client);
        }
        for (let char in node.children) {
            results = results.concat(this.collectAllClients(node.children[char]));
        }
        return results;
    }
}

const BASE_URL = 'https://api-v1.hotelman.dna-nova.tech';

export const useClientSearch = () => {
    const [trie, setTrie] = useState(new Trie());
    const [clients, setClients] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${BASE_URL}/clients/search?type=guest&page=1&pageSize=100`);
                const data = await response.json();
                setClients(data.clients || []);

                // Insertar clientes en el Trie
                const newTrie = new Trie();
                data.clients.forEach(client => {
                    newTrie.insert(client, client.nombres);
                    newTrie.insert(client, client.customID);
                });
                setTrie(newTrie);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []); // Dependencias vacías para ejecutar solo una vez al montar

    const searchClients = useCallback((query) => {
        setQuery(query);
        if (query.length > 0) {
            return trie.search(query);
        } else {
            return [];
        }
    }, [trie]);

    return { clients: searchClients(query), setQuery };
};