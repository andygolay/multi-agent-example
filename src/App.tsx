import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { MultiAgentTest } from "./MultiAgentTest";
import "./App.css";

// Key: NO dappConfig - let the wallet handle its own network
function App() {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      optInWallets={["Petra", "Nightly", "Razor Wallet"]}
      onError={(error) => {
        console.error("Wallet error:", error);
      }}
    >
      <div style={{ padding: "20px", fontFamily: "monospace" }}>
        <h1>Multi-Agent Transaction Test</h1>
        <p>Testing multi-agent on Movement (wallet must be on Movement network)</p>
        <hr />
        <MultiAgentTest />
      </div>
    </AptosWalletAdapterProvider>
  );
}

export default App;
