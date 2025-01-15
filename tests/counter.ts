import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { Keypair } from "@solana/web3.js";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;

  const counterAccount = new Keypair();

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize()
      .accounts({
        counter: counterAccount.publicKey
      })
      .signers([counterAccount])
      .rpc({ skipPreflight: true });
    console.log("Your transaction signature", tx);
    console.log("Count:", tx);
  });

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.increment()
      .accounts({
        counter: counterAccount.publicKey
      })
      .rpc();
      
      const accountData = await program.account.counter.fetch(
        counterAccount.publicKey,
      );
    console.log("Your transaction signature", tx);
    console.log("Count:", tx);
  });
});
