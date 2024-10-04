class Scooter {
    static nextSerial = 0
      constructor(station){
      Scooter.nextSerial++
        this.station = station
        this.user = null
        this.serial = Scooter.nextSerial
        this.charge = 100
        this.isBroken = false
    }
    rent(user){
      if(this.charge <= 20){
        throw new Error("scooter needs to charge")
    } else if(this.isBroken === true){
        throw new Error("scooter needs repair")
    } else {
      this.station = null
      this.user = user
    }
    } 
    dock(station){
      this.user = null
      this.station = station
    }
}

module.exports = Scooter
