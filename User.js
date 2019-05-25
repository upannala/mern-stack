const User = function (pFirstName, pLastName, pBDay, pId) {
    this.firstName=pFirstName;
    this.lastName = pLastName;
    this.birthDay =pBDay;
    this.id=pId;
}

/*
 in line number 11 User is variable wich is create in line 1.
 we need to exports variable to import. 
 */
module.exports = User;
 