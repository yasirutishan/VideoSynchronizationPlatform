function displyuser(currentUser) {
  if (currentUser != undefined) {
    let userObj = Object.values(currentUser)[2].firstname
    console.log(userObj)
  }
}

module.exports.displyuser = displyuser

