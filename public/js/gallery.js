function treeDOMObject(treeJSON) {
  const card = document.createElement('div');
  card.setAttribute('id', treeJSON._id);
  card.className = 'tree-card';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  card.appendChild(cardBody);

  const titleSpan = document.createElement('a');
  titleSpan.className = 'tree-title';
  titleSpan.innerHTML = treeJSON.creator_name + "'s Tree";
  cardBody.appendChild(titleSpan);

  // add image or graphic? maybe mini - vr? unclear exactly how to render many trees in AR/VR

  const buttonDiv = document.createElement('div')
  buttonDiv.className = 'tree-button-div row mt-4'
  cardBody.appendChild(buttonDiv)

  const renderARButtonDiv = document.createElement('div')
  renderARButtonDiv.className = 'col-6'
  const renderARButton = document.createElement('div')
  renderARButton.className = 'card-button'
  renderARButton.innerHTML = '<a href="/tree-ar?' + treeJSON._id + '">AR</a>'
  renderARButtonDiv.appendChild(renderARButton)
  buttonDiv.appendChild(renderARButtonDiv)

  const renderVRButtonDiv = document.createElement('div')
  renderVRButtonDiv.className = 'col-6'
  const renderVRButton = document.createElement('div')
  renderVRButton.className = 'card-button'
  renderVRButton.innerHTML = '<a href="/tree-vr?' + treeJSON._id + '">VR</a>'
  renderVRButtonDiv.appendChild(renderVRButton)
  buttonDiv.appendChild(renderVRButtonDiv)

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