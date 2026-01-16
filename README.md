# Multi-Agent Transaction Example (Movement)

A minimal example demonstrating multi-agent transactions on Movement testnet using the Aptos wallet adapter with Nightly wallet.

## Prerequisites

- Node.js
- Nightly wallet browser extension (set to Movement testnet)
- Two wallet addresses with testnet MOVE tokens

## Setup

```bash
npm install
npm run dev
```

## How It Works

This example demonstrates a 3-step multi-agent transaction flow where two signers must both sign a transaction:

### Step 1: Create Transaction (First Sender)

1. Connect your wallet (first signer)
2. Click "Step 1: Create TX"
3. Enter the second signer's address when prompted
4. The transaction is built and serialized

### Step 2: Sign (Second Sender)

1. Disconnect first wallet
2. Connect the second signer's wallet
3. Click "Step 2: Sign"
4. Approve the signature in your wallet
5. The signature is captured and serialized

### Step 3: Sign & Submit (First Sender)

1. Disconnect second wallet
2. Reconnect the first signer's wallet
3. Click "Step 3: Sign & Submit"
4. Approve the signature in your wallet
5. Transaction is submitted to Movement testnet

## Key Implementation Details

### Wallet Provider Setup

**Important:** Do NOT pass `dappConfig` to the wallet provider. Let the wallet handle network selection:

```tsx
<AptosWalletAdapterProvider
  autoConnect={true}
  optInWallets={["Nightly"]}
  onError={(error) => console.error("Wallet error:", error)}
>
```

### Aptos Client Config

Use `Network.CUSTOM` for Movement:

```tsx
const config = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: "https://testnet.movementnetwork.xyz/v1",
});
const aptos = new Aptos(config);
```

### Building Multi-Agent Transactions

```tsx
const transaction = await aptos.transaction.build.multiAgent({
  sender: AccountAddress.from(senderAddress),
  secondarySignerAddresses: [AccountAddress.from(secondSignerAddress)],
  data: {
    bytecode,
    functionArguments: [...],
  },
});
```

### Signing with Wallet Adapter

```tsx
const signature = await signTransaction({
  transactionOrPayload: transaction,
});
```

### Submitting with Wallet Adapter

```tsx
const tx = await submitTransaction({
  transaction,
  senderAuthenticator: senderSignature.authenticator,
  additionalSignersAuthenticators: [secondSignerAuthenticator],
});
```

## Common Issues

### "Network custom not supported with Aptos wallet adapter"

This error occurs when:
- `dappConfig` is passed to `AptosWalletAdapterProvider` - remove it
- Using SurfClient's submission methods instead of wallet adapter directly

**Solution:** Use the wallet adapter's `signTransaction` and `submitTransaction` directly with raw transaction objects, not through wrapper libraries like SurfClient.

## Files

- `src/App.tsx` - Wallet provider setup
- `src/MultiAgentTest.tsx` - Multi-agent transaction logic
- `public/transfer_two_by_two.mv` - Compiled Move script
