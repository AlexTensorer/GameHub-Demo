const app = {
    styles: [
      'empty',
      'plain',
      'light',
      'highlight',
    ],
    currentStyle: 'light',
    /**
     * Fonction pour démarrer notre application
     * On choisir le nom qu'on veut, le concept c'est que la fonction est appélée une seule fois
     */
    initialisation(){
      const configuration = document.querySelector('.configuration');
      const input = document.createElement('input');
      // Les attributs ont le même nom (camelCase), sauf class qui a className
      // <input type="number" id="grid-size" placeholder="Taille de la grille">
      input.type = 'number';
      input.id = 'grid-size';
      input.placeholder = 'Taille de la grille';
      configuration.appendChild(input);
  
      const button = document.createElement('button'); // Création
      // <button>Valider</button>
      button.textContent = 'Valider';
      // Fonction fléchée
      button.addEventListener('click', (e)=>{
        e.preventDefault(); // Ne fait pas ce que le navigateur fait par défaut
        // On donne la valeur de l'input à generateGrid
        let value = Number(input.value);
        if(value === 0){
          value = 8;
        }
        app.generateGrid(value);
      });
      configuration.appendChild(button); // Ajout dans la page
  
      // Création de la palette
      const palette = document.querySelector('.palette');
      for(const color of app.styles){
        const picker = document.createElement('div');
        picker.classList.add('palette-color', color);
        picker.addEventListener('click', ()=>{
          app.currentStyle = color;
        });
        palette.appendChild(picker);
      }
  
      app.generateGrid();
    },
    /**
     * Fonction qui génère la grille
     */
    generateGrid(size = 8){
      // - je selectionne la div #invader
      const invader = document.querySelector('#invader');
      // - supprimer l'ancienne grille
      invader.textContent = ''; // Hack supprimer tout les éléments HTML dans #invader
      /*
      autre alternative avec .remove()
      querySelectorAll('.cell').forEach(function(cell){
        cell.remove();
      });
      */
      // - Pour i allant de 0 à 7 :
      for (let i = 0; i < size; i++) {
        //   - je créé un div
        const row = document.createElement('div');
        //   - je lui met la classe .row
        row.classList.add('row');
        //   - pour j allant de 0 à 7 :
        for (let j = 0; j < size; j++) { // il ne faut pas réutiliser i sinon on le modifie
          //     - je créé un div
          const cell = document.createElement('div');
          //     - je lui met la class .cell
          cell.classList.add('cell','empty');
          // On rajoute le listener sur chaque cellule créé
          // Le listener permet de gérer le click pour faire alterner la couleur
          cell.addEventListener('click', app.handleCellClick);
          //     - je l'insère dans la div .row
          row.appendChild(cell);
        }
        //   - j'insère la div .row dans #invader
        invader.appendChild(row);
      }
    },
    /**
     * Fonction qui gère le clique sur une cellule
     */
    handleCellClick(event){
      // rajoute la classe si elle n'y est pas, sinon ça l'enlève
      // event.target.classList.remove('empty', 'plain', 'light', 'highlight');
      // on évite de taper chaque élément du tableau
      for(const color of app.styles){
        event.target.classList.remove(color);
      }
      event.target.classList.add(app.currentStyle);
    }
  };
  
  app.initialisation();