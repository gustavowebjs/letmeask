import logoImg from "../assets/img/logo.svg";
import { Button } from "../components/Button";
import "../styles/room.scss";

export function Room() {
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo Let Me Ask" />

          <span>Código</span>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que você quer perguntar?"></textarea>

          <div className="form-footer">
            <span>
              Para enviar uma pergunta, <button>Faça seu login</button>
            </span>
            <Button type="submit">Enviar Pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
