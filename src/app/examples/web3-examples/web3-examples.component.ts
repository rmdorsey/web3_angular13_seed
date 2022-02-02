import { Component, OnInit } from '@angular/core';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { PublicKey, SystemProgram, Transaction, clusterApiUrl, LAMPORTS_PER_SOL, Keypair, Connection, sendAndConfirmTransaction } from '@solana/web3.js';
// import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
// import base58 from 'bs58';
import { defer, from, throwError } from 'rxjs';
import { concatMap, first, map } from 'rxjs/operators';
import { isNotNull } from '../../core/web3/operators';
import { ConnectionStore, WalletStore } from '@heavy-duty/wallet-adapter';

@Component({
  selector: 'app-web3-examples',
  templateUrl: './web3-examples.component.html',
  styleUrls: ['./web3-examples.component.scss']
})
export class Web3ExamplesComponent implements OnInit {
  readonly connection$ = this._connectionStore.connection$;
  readonly wallets$ = this._walletStore.wallets$;
  readonly wallet$ = this._walletStore.wallet$;
  readonly walletName$ = this.wallet$.pipe(
    map((wallet) => wallet?.adapter.name || null)
  );
  readonly ready$ = this.wallet$.pipe(
    map(
      (wallet) =>
        wallet &&
        (wallet.adapter.readyState === WalletReadyState.Installed ||
          wallet.adapter.readyState === WalletReadyState.Loadable)
    )
  );
  readonly connected$ = this._walletStore.connected$;
  readonly publicKey$ = this._walletStore.publicKey$;
  lamports = 0;
  recipient = '';
  airDropRequest = 1;
  mintTokenQty = 100;
  transactionInProgress = false;

  //temp state vars for token
  mintingWalletSecretKey = '';
  isTokenCreated = false;
  createdTokenPublicKey = '';

  constructor(
    private readonly _connectionStore: ConnectionStore,
    private readonly _walletStore: WalletStore
    ) { }

  ngOnInit(): void {
  }

  onConnect() {
    this._walletStore.connect().subscribe();
  }

  onDisconnect() {
    this._walletStore.disconnect().subscribe();
  }

  onSelectWallet(walletName: WalletName) {
    this.transactionInProgress = false;
    this._walletStore.selectWallet(walletName);
  }

  onAirDrop(fromPubkey: PublicKey) {
    console.log(`AIRDROPPING ${this.airDropRequest} TO: ${fromPubkey}`)
    this.transactionInProgress = true;

    this.connection$
      .pipe(
        first(),
        isNotNull,
        concatMap((connection) => {
          return from(connection.requestAirdrop(fromPubkey,this.airDropRequest*LAMPORTS_PER_SOL))
            .pipe(
              first(),
              isNotNull,
              concatMap((signature) => {
                return connection.confirmTransaction(signature,'confirmed')
            })
          )
        })  
      )
      .subscribe(
        (result) => {
          // console.log(`RESULT ${result.toString()}`)
          console.log(result);
        },
        this.onErrorEvent,
        () => this.transactionInProgress = false
      );
  }

  onErrorEvent(err: Error):void {
    
    console.log(err);
    alert(err);
  }

  onSendTransaction(fromPubkey: PublicKey) {
    this.connection$
      .pipe(
        first(),
        isNotNull,
        concatMap((connection) =>
          from(defer(() => connection.getRecentBlockhash())).pipe(
            concatMap(({ blockhash }) =>
              this._walletStore.sendTransaction(
                new Transaction({
                  recentBlockhash: blockhash,
                  feePayer: fromPubkey,
                }).add(
                  SystemProgram.transfer({
                    fromPubkey,
                    toPubkey: new PublicKey(this.recipient),
                    lamports: this.lamports,
                  })
                ),
                connection
              )
            )
          )
        )
      )
      .subscribe(
        (signature) => console.log(`Transaction sent (${signature})`),
        (error) => console.error(error)
      );
  }

  onSignTransaction(fromPubkey: PublicKey) {
    this.connection$
      .pipe(
        first(),
        isNotNull,
        concatMap((connection) =>
          from(defer(() => connection.getRecentBlockhash())).pipe(
            map(({ blockhash }) =>
              new Transaction({
                recentBlockhash: blockhash,
                feePayer: fromPubkey,
              }).add(
                SystemProgram.transfer({
                  fromPubkey,
                  toPubkey: new PublicKey(this.recipient),
                  lamports: this.lamports,
                })
              )
            )
          )
        ),
        concatMap((transaction) => {
          const signTransaction$ =
            this._walletStore.signTransaction(transaction);

          if (!signTransaction$) {
            return throwError(
              new Error('Sign transaction method is not defined')
            );
          }

          return signTransaction$;
        })
      )
      .subscribe(
        (transaction) => console.log('Transaction signed', transaction),
        (error) => console.error(error)
      );
  }

  onSignAllTransactions(fromPubkey: PublicKey) {
    this.connection$
      .pipe(
        first(),
        isNotNull,
        concatMap((connection) =>
          from(defer(() => connection.getRecentBlockhash())).pipe(
            map(({ blockhash }) =>
              new Array(3).fill(0).map(() =>
                new Transaction({
                  recentBlockhash: blockhash,
                  feePayer: fromPubkey,
                }).add(
                  SystemProgram.transfer({
                    fromPubkey,
                    toPubkey: new PublicKey(this.recipient),
                    lamports: this.lamports,
                  })
                )
              )
            )
          )
        ),
        concatMap((transactions) => {
          const signAllTransaction$ =
            this._walletStore.signAllTransactions(transactions);

          if (!signAllTransaction$) {
            return throwError(
              new Error('Sign all transactions method is not defined')
            );
          }

          return signAllTransaction$;
        })
      )
      .subscribe(
        (transactions) => console.log('Transactions signed', transactions),
        (error) => console.error(error)
      );
  }

  onSignMessage() {
    const signMessage$ = this._walletStore.signMessage(
      new TextEncoder().encode('Hello world!')
    );

    if (!signMessage$) {
      return console.error(new Error('Sign message method is not defined'));
    }

    signMessage$.pipe(first()).subscribe((signature) => {
      // console.log(`Message signature: ${base58.encode(signature)}`);
    });
  }

}
