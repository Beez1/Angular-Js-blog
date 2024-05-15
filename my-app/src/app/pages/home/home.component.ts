import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  DIYQuestions = [
    {
      answerHidden: true,
      question: 'How can I repaint old furniture?',
      answer: 'To repaint old furniture, start by cleaning the surface thoroughly and sanding it to create a smooth base. Then, apply a primer to help the new paint adhere better. Once the primer is dry, apply your desired paint color using a brush or roller. Allow the paint to dry completely between coats, and finish with a protective sealant if desired.'
    },
    {
      answerHidden: true,
      question: 'What tools do I need to install laminate flooring?',
      answer: 'To install laminate flooring, you will need a few basic tools including a tape measure, a saw (circular saw or handsaw), a tapping block, a pull bar, spacers, and a rubber mallet. Additionally, you may need a jigsaw or miter saw for cutting the planks to fit around obstacles.'
    },
    {
      answerHidden: true,
      question: 'How can I create a gallery wall?',
      answer: 'To create a gallery wall, start by gathering your frames and artwork. Lay out the frames on the floor to plan your arrangement before hanging them on the wall. Use a level and measuring tape to ensure the frames are evenly spaced and aligned. Consider mixing frame sizes and styles for visual interest.'
    },
    {
      answerHidden: true,
      question: 'What are some easy woodworking projects for beginners?',
      answer: 'Some easy woodworking projects for beginners include building a simple shelf, a wooden planter box, a birdhouse, or a basic bench. These projects typically require basic tools like a saw, drill, hammer, and sandpaper, and can be completed in a weekend.'
    },
    {
      answerHidden: true,
      question: 'How can I make my own candles?',
      answer: 'To make your own candles, you will need wax, wicks, fragrance oils (if desired), and containers for the candles. Melt the wax in a double boiler, add fragrance oil if desired, and pour the melted wax into the containers. Insert the wicks and allow the candles to cool and harden before trimming the wicks.'
    },
    {
      answerHidden: true,
      question: 'What are some tips for upcycling old clothing?',
      answer: 'When upcycling old clothing, consider cutting fabric into smaller pieces to create patches, quilts, or tote bags. You can also use fabric dye to change the color of clothing or add embellishments like embroidery or appliqué to give them a new look.'
    }
  ];

  showAnswer(idx: number) {
    this.DIYQuestions[idx].answerHidden = !this.DIYQuestions[idx].answerHidden;
  }
}
