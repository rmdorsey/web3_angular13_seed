import { Component, OnInit } from '@angular/core';
import { InstallablePromptService } from '../core/services/installable-prompt.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private instPrompt: InstallablePromptService) { }

  ngOnInit(): void {
    
  }

  triggerPWAPrompt(): void{
    console.log("SHOW Z PROMPT!");
    this.instPrompt.showPrompt();
  }

}
