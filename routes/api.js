// routes/api.js
const service = require('../services/service');
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Dados de exemplo em memória
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

// Rota GET - Retorna todos os itens
router.get('/recuperarEleitores', (req, res) => {
    try {
        let { sortBy, filterBy, currentPage, itemsPerPage } = req.query; // Parâmetros de ordenação e filtro recebidos via GET
        // Filtra os dados mockados

        // Caminho para o arquivo mockData.json
        const dataPath = path.join(__dirname, './registros.json');

        sortBy = sortBy == "" ? null : sortBy;
        filterBy = filterBy == "" ? null : filterBy;
        // Ler e parsear os dados do arquivo JSON
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const mockData = JSON.parse(rawData);

        let filteredData = service.filterData(mockData, filterBy);

        let totalItems = filteredData.length;

        // Ordena os dados filtrados
        let sortedData = service.sortData(filteredData, sortBy);

        for (let i = 0; i < totalItems; i++) {
            sortedData[i].voteImage += `?${i}`;
        }

        const startIndex = (+currentPage - 1) * itemsPerPage; // Índice inicial
        const endIndex = startIndex + +itemsPerPage; // Índice final
        const paginatedData = sortedData.slice(startIndex, endIndex); // Fatia os dados de acordo com a página

        // Retorna o JSON com os dados paginados
        let response = {
            "total": totalItems,
            "data": paginatedData
        }
        res.json(response);
    } catch (error) {
        console.error('Erro ao recuperar os dados:', error);
        res.status(500).json({ error: 'Erro ao recuperar os dados' });
    }
});

module.exports = router;
