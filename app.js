import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Bolos da Lau Lau");
});

const bolos = [
    {
        id: 1,
        descricao: "Bolo caseiro de chocolate",
        nome_produto: "Bolo de chocolate",
        valor: "R$ 20,00",
    },
    {
        id: 2,
        descricao: "Bolo caseiro de cenoura",
        nome_produto: "Bolo de Cenoura",
        valor: "R$ 25,00",
    },
    {
        id: 3,
        nome_produto: "Bolo de M&M",
        descricao: "Bolo caseiro de M&M",
        valor: "R$ 35,90",
    },
    {
        id: 4,
        descricao: "Bolo caseiro de Red Velvet",
        nome_produto: "Bolo de Red Velvet",
        valor: "R$ 27,00",
    },
    {
        id: 5,
        descricao: "Fatia de bolo com recheio de paçoca",
        nome_produto: "Bolo pedaço- Paçoca",
        valor: "R$ 14,50",
    },
    {
        id: 6,
        descricao: "Fatia de bolo s/ recheio, apenas a massa é limão",
        nome_produto: "Bolo pedaço- Limão",
        valor: "R$ 16,00",
    },
    {
        id: 7,
        descricao: "Bolo artificial de morango com frutas na parte de cima",
        nome_produto: "Bolo de Morango",
        valor: "R$ 28,00",
    },
];

function findBoloIndex(id) {
    return bolos.findIndex(bolo => bolo.id === Number(id));
}

app.route("/bolos")
    .get((req, res) => {
        res.status(200).json(bolos);
    })
    .post((req, res) => {
        bolos.push(req.body);
        res.status(201).send("Adicionado com sucesso");
    });

app.route("/bolos/:id")
    .get((req, res) => {
        const id = findBoloIndex(req.params.id);
        if (id !== -1) {
            res.status(200).json(bolos[id]);
        } else {
            res.status(404).send("Bolo não encontrado!");
        }
    })
    .put((req, res) => {
        const id = findBoloIndex(req.params.id);
        if (id !== -1) {
            bolos[id].descricao = req.body.descricao;
            bolos[id].nome_produto = req.body.nome_produto;
            bolos[id].valor = req.body.valor;
            res.status(200).json(bolos[id]);
        } else {
            res.status(404).send("Bolo não encontrado!");
        }
    })
    .delete((req, res) => {
        const id = findBoloIndex(req.params.id);
        if (id !== -1) {
            bolos.splice(id, 1);
            res.status(200).send("Bolo foi removido com sucesso!");
        } else {
            res.status(404).send("Bolo não encontrado! Procura direito");
        }
    });

export default app;
