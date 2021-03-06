import { useHistory } from "react-router-dom";

import IllustrationSVG from "../assets/img/illustration.svg";
import Logo from "../assets/img/logo.svg";
import GooggleIcon from "../assets/img/google-icon.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");
  const { user, signInWithGoogle } = useAuth();

  //verify user or make login
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") return;

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");

      return;
    }

    history.push(`/rooms/${roomRef.key}`);
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

          <button onClick={handleCreateRoom} className="create-room">
            <img src={GooggleIcon} alt="Google logo" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              onChange={(e) => setRoomCode(e.target.value)}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
