import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { Actor, ActorSubclass, HttpAgent, ActorMethod } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import { idlFactory, canisterId } from "../../../declarations/nooted_backend";

interface Props {
  children: React.ReactNode;
}

type Context = {
  actor: ActorSubclass<Record<string, ActorMethod<any[], any>>> | any;
  login: () => void;
  logout: () => void;
  handleActor: (authClient: AuthClient) => void;
  getOwnedNotes: () => Promise<void>;
  addNote: () => Promise<void>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  notes: INote[];
  updateNote: (keyId: number, id: string, content: string) => Promise<void>;
  deteteNote: (keyId: number, id: string) => Promise<void>;
  getPrincipalID: () => Promise<void>;
  principal: string;
};

interface INote {
  id: string;
  content: string;
}

export const AppContext = createContext<Context>({} as Context);

export const AppProvider = ({ children }: Props) => {
  const uuid = crypto.randomUUID();
  const navigate = useNavigate();

  const [authClient, setAuthClient] = useState<AuthClient>();
  const [actor, setActor] =
    useState<ActorSubclass<Record<string, ActorMethod<any[], any>>>>();
  const [content, setContent] = useState<string>("");
  const [notes, setNotes] = useState<INote[]>([]);
  const [principal, setPrincipal] = useState<string>("");

  const handleAuthenticated = async () => {
    try {
      const client = await AuthClient.create();
      setAuthClient(client);

      if (await client.isAuthenticated()) {
        handleActor(client);
        navigate("/app");
        console.log("Authenticated");
      } else {
        navigate("/");
        console.log("Not Authenticated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleActor = (authClient: AuthClient) => {
    const identity = authClient.getIdentity();
    const host = "http://localhost:8080";
    const agent = new HttpAgent({ identity, host });
    // remove on live deployment
    agent.fetchRootKey();
    const actor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });

    setActor(actor);
  };

  const login = async () => {
    try {
      await authClient?.login({
        identityProvider:
          process.env.NODE_ENV === "development"
            ? `http://localhost:4943/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}#authorize`
            : "https://identity.ic0.app/#authorize",
        onSuccess: async () => {
          handleActor(authClient);
          navigate("/app");
          console.log("Login success");
        },
        // 7 days in nanoseconds
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await authClient?.logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async () => {
    try {
      const newNote: INote = {
        id: uuid,
        content: "This is a new note",
      };

      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });

      const result = await actor?.addNote(newNote.id, newNote.content);

      console.log(result, newNote);
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (keyId: number, id: string, content: string) => {
    const newKeyId = BigInt(keyId.toString());
    await actor?.updateNote(newKeyId, id, content);
    console.log(`Updated: ${newKeyId} - ${id} - ${content}`);
  };

  const deteteNote = async (keyId: number, id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
    const newKeyId = BigInt(keyId.toString());
    await actor?.deleteNote(newKeyId);
    console.log(`Deleted: ${newKeyId} - ${id}`);
  };

  const getOwnedNotes = async () => {
    const result = await actor?.getAllOwnedNotes();
    setNotes(result);
  };

  const getPrincipalID = async () => {
    try {
      const data = await actor?.whoami();
      setPrincipal(data?.toString());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleAuthenticated();
  }, []);

  return (
    <AppContext.Provider
      value={{
        actor,
        login,
        logout,
        handleActor,
        getOwnedNotes,
        content,
        setContent,
        addNote,
        notes,
        updateNote,
        deteteNote,
        getPrincipalID,
        principal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
