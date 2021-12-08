import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";

function TituloProjeto() {
  return (
    <div>
      <h1 id="Titulo">Lord of the rings</h1>
      <h2 id="SubTitulo">Lista de Personagens</h2>
    </div>
  );
}

function CardItem(props) {
  return (
    <Route
      render={({ history }) => (
        <div
          className="card_item"
          onClick={() => {
            history.push("/visualizar/" + props.item._id);
          }}
        >
          <h2>{props.item.nome}</h2>
          <img
            id="ImagensIniciais"
            src={props.item.imagem}
            alt={props.item.nome}
            width="300"
          />
          <div>Clique para ver os detalhes</div>
        </div>
      )}
    />
  );
}

class ListarItens extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itens: [],
    };
  }

  async componentDidMount() {
    const request = await fetch("https://backend-flexivel.herokuapp.com/", {
      headers: new Headers({
        Authorization: "dev.uzeda",
      }),
    });

    const json = await request.json();

    this.setState({
      itens: json,
    });
  }

  render() {
    return (
      <div className="lista_itens">
        {this.state.itens.map((item, index) => (
          <CardItem item={item} key={index} />
        ))}
      </div>
    );
  }
}

class VisualizarItem extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;

    this.state = {
      item: {},
    };
  }

  async componentDidMount() {
    const request = await fetch(
      "https://backend-flexivel.herokuapp.com/" + this.id,
      {
        headers: new Headers({
          Authorization: "dev.uzeda",
        }),
      }
    );

    const json = await request.json();

    this.setState({
      item: json,
    });
  }

  render() {
    return (
      <div className="card_item">
        <h2>{this.state.item.nome}</h2>
        <img
          src={this.state.item.imagem}
          alt={this.state.item.nome}
          width="300"
        />
        <div id="Descricao">{this.state.item.descricao}</div>
        <br></br>
        <br></br>
        <div id="alinharBotao">
          <a href="/..">
            <button id="botaoVoltar">VOLTAR</button>
          </a>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={ListarItens} />

      <Route path="/visualizar/:id" component={VisualizarItem} />
    </Switch>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TituloProjeto />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
