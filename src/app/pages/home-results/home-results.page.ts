import {Component, OnInit} from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

import {QuestionsPage} from '../modal/questions/questions.page';
import {AppService} from '../../api/app.service';
import {Items} from '../../models/Items';
import {Questoes} from '../../models/Questoes';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit {

  private error: any;

  public items: Array<Items>;
  public itemConcat: Items;
  private curso: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private service: AppService
  ) {

  }

  ngOnInit(): void {
    this.curso = environment.curso;
    // consulto questoes no AWS serveless backend
    this.service.getQuestoes().subscribe(
        (data: Array<Items>) => {
          this.items = data['Items'];
          if (this.items.length > 0) {
            // após carregar os dados concateno todos itens em uma array.
            let questoes: Array<Questoes>; // não começo pelo item anterior n-1, então sempre terei um ultimo item undefined.
            this.items.map(value => {
                    questoes = value.Questoes.concat(questoes);
            });
            questoes = questoes.filter(q => q !== undefined); // removo o item undefined do começo da interação em n.

            // entao crio um objeto de items para guardar TODAS questoes.
            this.itemConcat = new Items();
            this.itemConcat.Materia = 'Todas questões do curso.';
            this.itemConcat.Curso = environment.curso;
            this.itemConcat.Questoes = questoes;

            // adiciono ao final dos items consultados do backend serveless da AWS
            this.items.push(this.itemConcat);
          }
//           console.log(this.items);
         }, // success path
        error => this.error = error);

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  async questions (questoes: Questoes[]) {
    const modal = await this.modalCtrl.create({
      component: QuestionsPage,
      componentProps: { value: questoes }
    });
    return await modal.present();
  }
}
