// BuildQueue: shows what each faction can build, in the #build_queue panel.
// Created by Game:  this.buildQueue = new BuildQueue(this, document.getElementById('build_queue'));
// Turn order steps call it with:  ['buildQueue', 'showRebelBuild'] etc.

class BuildQueue {

    /**
     * @param {Game} game            the game (used for game.map and game.useExpansion)
     * @param {HTMLElement} element  the panel that displays the queue
     */
    constructor(game, element) {
        this.game = game;
        this.element = element;
    }

    /**
     * See resource ids explanation inside map.js below getResources
     * Units id is the resource id required to build it
     */
    showRebelBuild() {
        console.log('Looking for rebel resources');
        const resources = this.game.map.getResources([1]);
        let units = {
            1: 'X-Wing or Y-Wing or Transport',
            2: 'Corellian Corvette',
            3: 'Mon Calamari Cruiser',
            4: 'Rebel Trooper',
            5: 'Airspeeder',
            6: 'Generator or Canon'
        };
        if(this.game.useExpansion) {
            units[1] += ' or U-Wing';
            units[2] += ' or Nebulon-B Frigate';
            units[4] += ' or Rebel Vanguard';
            units[5] += ' or Golan Arms Turret';
        }
        this.showResources(resources, units);
    }

    showEmpireBuild() {
        console.log('Looking for empire resources');
        let resources = this.game.map.getResources([2,3,4]);
        let units = {
            1: 'TIE Fighter',
            2: 'Assault Carrier',
            3: 'Star Destroyer',
            4: 'Stormtrooper',
            5: 'AT-ST',
            6: 'AT-AT'
        };
        if(this.game.useExpansion) {
            units[1] += ' or Tie Striker';
            units[4] += ' or Assault Tank';
            units[5] += ' or Shield Bunker';
        }
        this.showResources(resources, units);
    }

    showResources(resources, units) {
        var queue = {
            1: {},
            2: {},
            3: {}
        };
        resources.forEach(function(res){
            if(queue[res.q][res.type] === undefined) {
                queue[res.q][res.type] = 0
            }
            queue[res.q][res.type] ++;
        });

        let str = '';
        for(let i in queue) {
            let line = '';
            for(let type in queue[i]) {
                line += '<li>'+units[type]+''+(queue[i][type] > 1 ? ' <strong>x' + queue[i][type] + '</strong>' : '')+'</li>';
            }
            if(line == '') {
                continue;
            }
            str += '<h3>Queue ' + i + '</h3><ul>'+line+'</ul>';
        }
        this.element.style.display = 'block';
        this.element.innerHTML = str;
    }

    hideBuild() {
        this.element.style.display = 'none';
    }
}
