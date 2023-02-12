import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Map "mo:hashmap/Map";

actor {

	let { ihash; nhash; thash; phash; calcHash } = Map;

	type Errors = {
		#NotFound;
	};

	type Note = {
		id : Text;
		content : Text;
	};

	var notesByUser : Map.Map<Principal, Buffer.Buffer<Note>> = Map.new<Principal, Buffer.Buffer<Note>>(phash);

	public shared ({ caller }) func addNote(id : Text, content : Text) : async () {
		let userNotes : Buffer.Buffer<Note> = switch (Map.get(notesByUser, phash, caller)) {
			case null Buffer.Buffer<Note>(0);
			case (?v) v;
		};

		let newNote : Note = {
			id = id;
			content = content;
		};

		userNotes.add(newNote);
		Map.set(notesByUser, phash, caller, userNotes);
	};

	public query ({ caller }) func getAllOwnedNotes() : async [Note] {
		let userNotes : Buffer.Buffer<Note> = switch (Map.get(notesByUser, phash, caller)) {
			case null Buffer.Buffer<Note>(0);
			case (?v) v;
		};
		return Buffer.toArray(userNotes);
	};

	public shared ({ caller }) func updateNote(keyId : Nat, id : Text, content : Text) : async () {
		let userNotes : Buffer.Buffer<Note> = switch (Map.get(notesByUser, phash, caller)) {
			case null Buffer.Buffer<Note>(0);
			case (?v) v;
		};

		let newNote : Note = {
			id = id;
			content = content;
		};

		userNotes.put(keyId, newNote);
	};

	public shared ({ caller }) func deleteNote(id : Nat) : async () {
		let userNotes : Buffer.Buffer<Note> = switch (Map.get(notesByUser, phash, caller)) {
			case null Buffer.Buffer<Note>(0);
			case (?v) v;
		};

		let result = userNotes.remove(id);
	};

	public query ({ caller }) func whoami() : async Principal {
		return caller;
	};
};
