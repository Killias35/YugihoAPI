export default class LifePoint {
    maxLifePoint = 8000;

    resetLifePointOfPlayer(player) {
        // calcul des lp restants
        player.lifePoint = this.maxLifePoint;
    }

    setLifePointOfPlayer(player, lifePoint) {
        // calcul des lp restants
        player.lifePoint = lifePoint;
    }
}