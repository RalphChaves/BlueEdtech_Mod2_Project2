const express = require("express"); // importando o express
const path = require("path"); // importando o path
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs"); //set engine para trabalhar com o EJS
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));

const pokedex = [{ 
    numero: "Nº009",
    nome: "Blastoise" ,
    tipo: "Water",
    imagem: "/img/blastoise009.png",
    descrição: "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.",
    altura: "1.6 m",
    peso: "85.5 kg",
    categoria: "Shellfish",
    habilidade: "Torrent",
},{
    numero: "Nº059",
    nome: "Arcanine",
    tipo: "Fire",
    imagem: "/img/arcanaine059.png",
    descrição: "The sight of it running over 6,200 miles in a single day and night has captivated many people.",
    altura: "1.9 m",
    peso: "155.0 kg",
    categoria: "Legendary",
    habilidade: "Intimidate, Flash Fire",
    
},{
    numero: "Nº144",
    nome: "Articuno",
    tipo: "Ice, Flying",
    imagem: "/img/articuno144.png",
    descricao: "It’s said that this Pokémon’s beautiful blue wings are made of ice. Articuno flies over snowy mountains, its long tail fluttering along behind it.",
    altura: "1.7 m",
    peso: "55.4 kg",
    categoria: "Freeze",
    habilidade: "Pressure",
}];

let message = "";
app.get("/", function (req, res) {
   
    setTimeout(() => {
        message = "";
    }, 1000);
    res.render("index", {pokedex: pokedex,message});
    
});

app.get("/cadastro", function (req, res) {
    res.render("cadastro");

});

app.post("/recebdados", function (req, res) {
    const {numero, nome, tipo, imagem, descricao, altura, peso, categoria, habilidade} = req.body;
    pokedex.push({
    numero:numero,
    nome:nome,
    tipo: tipo,
    imagem:imagem,
    descricao:descricao,
    altura: altura,
    peso: peso,
    categoria: categoria,
    habilidade: habilidade});
    
    message = "Pokemon cadastrado com sucesso.";
    res.redirect("/");
}); 


app.get("/detalhes/:id", function (req, res) {
    const id = req.params.id;
    const pokedexx = pokedex[id];
    res.render("detalhes", {pokedexx,});
});












app.listen(port, ()=> console.log(`Servidor rodando em http://localhost:${port}`)); //faz o servidor escutar, passando a porta onde o serviço vai ficar ativo