export default class LifePoint {
    maxLifePoint = 8000;

    ResetLifePointOfPlayer(player) {
        // calcul des lp restants
        player.lp = this.maxLifePoint;
    }

    SetLifePointOfPlayer(player, lifePoint) {
        // calcul des lp restants
        player.lp = lifePoint;
    }
}