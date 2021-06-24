import { Link, useHistory } from "react-router-dom";
import IllustrationSVG from "../assets/img/illustration.svg";
import Logo from "../assets/img/logo.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    //trim to remove blank spaces
    if (newRoom.trim() === "") {
      return;
    }

    //create table rooms on realtime database
    const roomRef = database.ref("rooms");

    //then push some object
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={IllustrationSVG} alt="Let me ask" />

        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real.</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={Logo} alt="Logo Let me ask" />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              onChange={(e) => setNewRoom(e.target.value)}
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/">Clique aqui </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
