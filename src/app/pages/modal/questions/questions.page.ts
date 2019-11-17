import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AppService} from '../../../api/app.service';
import {Questoes} from '../../../models/Questoes';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.page.html',
    styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

    @Input() value: Questoes[];
    public iTems: Questoes[];


    private error: any;
    public questao: Questoes;
    public index: number; // indice para saber em que questou estou
    public acertou: number; // numero de acertos
    public percentAcertos: number; // percentual de acertos
    public verResultados: boolean; // controla se quero ver ou nao os resultados

    constructor(private modalCtrl: ModalController, private service: AppService) {
    }

    ngOnInit() {
        this.acertou = 0;
        this.percentAcertos = 0;
        this.verResultados = false;
        this.iTems = this.value;
        this.questao = this.iTems[0];
        this.index = 0;
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }

    proxima() {
        if (this.index < this.iTems.length - 1) {
            this.index++;
            this.questao = this.iTems[this.index];
        } else {
            // TODO: fazer algum tratamento quando ultrapassa o final das questoes.
        }

    }

    anterior() {
        if (this.index >= 1) {
            this.index--;
            this.questao = this.iTems[this.index];
        } else {
            // TODO: fazer algum tratamento quando ultrapassa o inicio das questoes.
        }
    }

    isChecked(letra: string) {
        if (this.questao.resposta === letra) {
            return true;
        } else {
            return false;
        }

    }

    isRight(letra: string) {
        if (!this.verResultados) {
            return 'neutralAnswer';
        }
        if (this.questao.gabarito === letra) {
            return 'rightAnswer';
        } else if (this.questao.gabarito !== letra && this.questao.resposta === letra) {
            return 'wrongAnswer';
        } else {
            return 'neutralAnswer';
        }

    }

    answer(letra: string) {
        this.iTems[this.index].resposta = letra;
    }
    async calculaAcertos(): Promise<number> {

        this.acertou = 0;

        await this.iTems.forEach(questao => {
            if (questao.resposta !== undefined) {
                if (questao.resposta === questao.gabarito) {
                    this.acertou++;
                }
            }
        });
        this.percentAcertos = (this.acertou * 100) / this.iTems.length;
        this.verResultados = true;
        return this.percentAcertos;
    }

    async restart() {

        this.index = 0;
        this.questao = this.iTems[this.index];

        this.acertou = 0;
        this.percentAcertos = 0;
        this.verResultados = false;

        await this.iTems.forEach(questao => {
            questao.resposta = '';
        });

    }
}
