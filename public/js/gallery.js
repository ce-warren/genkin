function treeDOMObject(treeJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', treeJSON.title);
  card.className = 'tree-card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const titleSpan = document.createElement('a');
  titleSpan.className = 'tree-title';
  titleSpan.innerHTML = treeJSON.creator_name + "'s Tree";
  cardBody.appendChild(titleSpan);

  // add image or graphic? maybe mini - vr? unclear exactly how to render many trees in AR/VR

  return card;
}

function renderTreeCards() {
  const treesDiv = document.getElementById('trees-container');
  get('/api/public-trees', {'public': true}, function(treesArr) {
      for (let i = 0; i < treesArr.length; i++) {
          const currentTree = treesArr[i];
          treesDiv.prepend(treeDOMObject(currentTree));
      };
  });
};

function main() {
  renderTreeCards();
};

main();