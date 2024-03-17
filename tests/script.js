class Tree {
    constructor(data, parentNode = null) {
      this.data = data;
      this.children = [];
      this.parentNode = parentNode;
      this.nodeElement = null;
      this.branchElements = [];
      this.linkElements = [];
    }
  
    render(svgElement, x, y, linkAngle = 0) {
      const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      nodeGroup.setAttribute('class', 'node');
      nodeGroup.setAttribute('transform', `translate(${x}, ${y})`);
  
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', 20);
      nodeGroup.appendChild(circle);
  
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.textContent = this.data.label;
      text.setAttribute('x', 0);
      text.setAttribute('y', 25);
      nodeGroup.appendChild(text);
  
      svgElement.querySelector('.nodes').appendChild(nodeGroup);
      this.nodeElement = nodeGroup;
  
      if (this.data.links) {
        const linkGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        linkGroup.setAttribute('transform', `translate(${x}, ${y + 50})`);
  
        this.data.links.forEach((link, index) => {
          const linkElement = document.createElementNS('http://www.w3.org/2000/svg', 'a');
          linkElement.setAttribute('class', 'link');
          linkElement.setAttribute('href', link.url);
          linkElement.setAttribute('target', '_blank');
          linkElement.textContent = link.label;
  
          const angle = (linkAngle + (Math.PI * 2 * index) / this.data.links.length) % (Math.PI * 2);
          const radius = 100;
          const linkX = radius * Math.cos(angle);
          const linkY = radius * Math.sin(angle);
  
          linkElement.style.transform = `translate(${linkX}px, ${linkY}px)`;
          linkGroup.appendChild(linkElement);
          this.linkElements.push(linkElement);
        });
  
        svgElement.appendChild(linkGroup);
      }
  
      if (this.data.children) {
        const childX = x + 150;
        const childY = y + 100;
        const childAngle = Math.PI / 4;
  
        this.data.children.forEach((child, index) => {
          const childTree = new Tree(child, this);
          const branchElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          branchElement.setAttribute('class', 'branch');
          branchElement.setAttribute('d', `M${x},${y} C${x + 50},${y} ${childX - 50},${childY} ${childX},${childY}`);
          svgElement.appendChild(branchElement);
          this.branchElements.push(branchElement);
  
          childTree.render(svgElement, childX, childY, childAngle + (Math.PI * 2 * index) / this.data.children.length);
        });
      }
    }
  }
  
  const treeData = {
    label: 'Root',
    children: [
      {
        label: 'Branch 1',
        children: [
          {
            label: 'Leaf 1',
            links: [
              { label: 'Link 1', url: 'https://example.com/link1' },
              { label: 'Link 2', url: 'https://example.com/link2' }
            ]
          }
        ]
      },
      {
        label: 'Branch 2',
        children: [
          {
            label: 'Leaf 2',
            links: [
              { label: 'Link 3', url: 'https://example.com/link3' }
            ]
          },
          {
            label: 'Sub-Branch',
            children: [
              {
                label: 'Leaf 3',
                links: [
                  { label: 'Link 4', url: 'https://example.com/link4' },
                  { label: 'Link 5', url: 'https://example.com/link5' }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  
  const tree = new Tree(treeData);
  const svgElement = document.querySelector('.tree');
  tree.render(svgElement, 250, 50);