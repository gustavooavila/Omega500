"use strict";

(function (Ω) {
  "use strict";

  var _Node, QuadTree;

  QuadTree = Ω.Class.extend({
    init: function init(bounds, maxItems, maxDepth) {
      maxItems = maxItems || 10;
      maxDepth = maxDepth || 4;
      this.root = new _Node(bounds, 0, maxItems, maxDepth);
    },
    retrieve: function retrieve(item) {
      return this.root.retrieve(item);
    },
    insert: function insert(item) {
      this.root.insert(item);
    },
    clear: function clear(node) {
      this.root.clear();
    },
    render: function render(gfx) {
      this.root.render(gfx);
    }
  });

  _Node = function Node(bounds, depth, maxItems, maxDepth) {
    var nodes = [],
        items = [];
    return {
      bounds: bounds,
      depth: depth,
      retrieve: function retrieve(item, output) {
        output = (output || []).concat(items);

        if (nodes.length) {
          var quad = this.findQuadrant(item);
          return nodes[quad].retrieve(item, output);
        }

        return output;
      },
      insert: function insert(item) {
        var quad;

        if (nodes.length) {
          quad = this.findInsertNode(item);

          if (quad < 0) {
            items.push(item);
          } else {
            nodes[quad].insert(item);
          }
        } else {
          items.push(item);

          if (items.length > maxItems && depth < maxDepth) {
            this.split();
          }
        }
      },
      split: function split() {
        var w = bounds.w / 2,
            h = bounds.h / 2,
            newDepth = depth + 1,
            oldItems = items;
        [[0, 0], [0, h], [w, 0], [w, h]].forEach(function (node) {
          nodes.push(_Node({
            x: bounds.x + node[0],
            y: bounds.y + node[1],
            w: w,
            h: h
          }, newDepth, maxItems, maxDepth));
        });
        items = [];
        oldItems.forEach(function (item) {
          this.insert(item);
        }, this);
      },
      clear: function clear() {
        items.length = 0;
        nodes && nodes.forEach(function (n) {
          n.clear();
        });
        nodes.length = 0;
      },
      findQuadrant: function findQuadrant(item) {
        var quad;

        if (item.x < bounds.x + bounds.w / 2) {
          quad = item.y < bounds.y + bounds.h / 2 ? 0 : 1;
        } else {
          quad = item.y < bounds.y + bounds.h / 2 ? 2 : 3;
        }

        return quad;
      },
      findInsertNode: function findInsertNode(item) {
        if (item.x + item.w < bounds.x + bounds.w / 2) {
          if (item.y + item.h < bounds.y + bounds.h / 2) {
            return 0;
          }

          if (item.y >= bounds.y + bounds.h / 2) {
            return 1;
          }

          return -1;
        }

        if (item.x >= bounds.x + bounds.w / 2) {
          if (item.y + item.h < bounds.y + bounds.h / 2) {
            return 2;
          }

          if (item.y >= bounds.y + bounds.h / 2) {
            return 3;
          }

          return -1;
        }

        return -1;
      },
      render: function render(gfx, col) {
        var c = gfx.ctx;
        c.strokeStyle = col || "#444";
        c.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
        nodes && nodes.forEach(function (node) {
          node.render(gfx, col);
        });
      }
    };
  };

  Ω.utils.QuadTree = QuadTree;
})(window.Ω);