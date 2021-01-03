/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let friendsList = document.createElement('ul');

  document.body.append(friendsList);

  friends.forEach(({firstName: name, lastName: surname}) => {
    let friend = document.createElement('li');
    friend.innerHTML = `${name} ${surname}`;
    
    friendsList.append(friend);

  });

  return document.body.lastElementChild;
}

