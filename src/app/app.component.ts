import { Component, OnInit } from '@angular/core';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
//ERRORS APPEAR WHEN WALLET ADAPTERS IMPORTED
// import {
//   LedgerWalletAdapter,
//   PhantomWalletAdapter,
//   SlopeWalletAdapter,
//   SolflareWalletAdapter,
//   SolletWalletAdapter,
//   TorusWalletAdapter,
// } from '@solana/wallet-adapter-wallets';
import { ConnectionStore, WalletStore } from '@heavy-duty/wallet-adapter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WEB 3 SEED';
  isLoadingRoute = false;

  constructor(
    private router: Router,
    private _connectionStore: ConnectionStore,
    private _walletStore: WalletStore
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoadingRoute = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
        this.isLoadingRoute = false;
      }
    })
  }

  ngOnInit() {
    this._connectionStore.setEndpoint('http://api.devnet.solana.com');
    // this._walletStore.setAdapters([
    //   new PhantomWalletAdapter(),
    //   new SlopeWalletAdapter(),
    //   new SolflareWalletAdapter(),
    //   new TorusWalletAdapter(),
    //   new LedgerWalletAdapter(),
    //   new SolletWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    // ]);
  }

}
