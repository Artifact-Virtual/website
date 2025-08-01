import { Wallet, ConnectWallet, Avatar, Name, WalletDropdown, Identity, Address, EthBalance, WalletDropdownDisconnect } from "artifactvirtual";

export const WalletComponent = () => (
  <Wallet>
    <ConnectWallet>
      <Avatar className="h-6 w-6" />
      <Name />
    </ConnectWallet>
    <WalletDropdown>
      <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
        <Avatar />
        <Name />
        <Address />
        <EthBalance />
      </Identity>
      <WalletDropdownDisconnect />
    </WalletDropdown>
  </Wallet>
);
