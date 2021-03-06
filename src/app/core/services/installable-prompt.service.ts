import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstallablePromptComponent } from '../components/installable-prompt/installable-prompt.component';

@Injectable({
  providedIn: 'root'
})
export class InstallablePromptService {

  installablePrompt:any;

  constructor(private dialog: MatDialog) { 
    this.init();
  }

  init() {
    
    window.addEventListener(
      'beforeinstallprompt', this.handleInstallPrompt.bind(this)
    );
  }

  handleInstallPrompt(e:any) {
    e.preventDefault();
    //stash the event so it can be triggered later.
    this.installablePrompt = e;

    console.log('installable prompt event fired');
    window.removeEventListener('beforeinstallprompt', this.handleInstallPrompt);
  }

  async showPrompt() {
    if(!this.installablePrompt) {
      return;
    }
    
    const dialogRef = this.dialog.open(InstallablePromptComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if(!result) {
        this.installablePrompt = null;
        return;
      }
      
      this.installablePrompt.prompt();

      const { outcome } = await this.installablePrompt.userChoice;

      this.installablePrompt = null;
    })
  }
}