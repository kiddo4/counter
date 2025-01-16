import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { Keypair, PublicKey } from "@solana/web3.js";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;



  const [counterPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId,
  );

  it("Is initialized!", async () => {
    // Add your test here.
    try {
      const tx = await program.methods.initialize()
      .accounts({
        counter: counterPDA
      })

      .rpc({ skipPreflight: true });

    const accountData = await program.account.counter.fetch(
      counterPDA,
    );

    console.log("Your transaction signature", tx);
    console.log("Count:", accountData.count);
    } catch (e) {
      console.log(e);
    }
    
  });

  it("Increment!", async () => {
    // Add your test here.
    const tx = await program.methods.increment()
      .accounts({
        counter: counterPDA
      })
      .rpc();

    const accountData = await program.account.counter.fetch(
      counterPDA,
    );
    console.log("Your transaction signature", tx);
    console.log("Count:", accountData.count);
  });
});
