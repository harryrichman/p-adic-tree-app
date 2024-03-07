
function twoAdicTree(ns) {
    /*
    Args:
        ns: list of integers
    */
    const root_node = {
        id: "*",
        label: "*",
        // label: ns.join(" "),
    };
    var tree = { nodes: [root_node], edges: [] };
    const shift_ns = ns;
    var to_process = [[root_node, shift_ns, ns]];
    while (to_process.length > 0) {
        // blah
        const [current_node, current_ns, unshift_ns] = to_process.pop();
        // console.log("ns at node: ", unshift_ns);
        current_label = current_node.id;
        if (current_ns.length == 0) {
            console.log("ERROR!");
            return -1;
        // } else if (current_ns.length == 1) {
        //     // dead code currently
        //     current_node.label = unshift_ns[0];
        //     continue;
        } else { // 2 or more numbers in current_ns
            // sort ns into even- and odd-subsets
            var even_ns = [];
            var even_unshift_ns = [];
            var odd_ns = [];
            var odd_unshift_ns = [];
            for (let i = 0; i < current_ns.length; i++) {
                n = current_ns[i];
                un = unshift_ns[i];
                if (n % 2 == 0) {
                    even_ns.push(n);
                    even_unshift_ns.push(un);
                } else {
                    odd_ns.push(n);
                    odd_unshift_ns.push(un);
                }
            }
            if (even_ns.length > 0) {
                const label = "*0" + current_label.slice(1);
                const node = {
                    id: label,
                    label: label,
                    // label: even_unshift_ns.join(" "),
                };
                tree.nodes.push(node);
                const edge = { 
                    from: current_label, 
                    to: label,
                    id: current_label + "->" + label,
                };
                tree.edges.push(edge);
                const next_ns = even_ns.map(n => n / 2);
                if (even_ns.length > 1) {
                    to_process.push([node, next_ns, even_unshift_ns]);
                } else {
                    node.label = "" + even_unshift_ns[0];
                }
            }
            if (odd_ns.length > 0) {
                const label = "*1" + current_label.slice(1);
                const node = {
                    id: label,
                    label: label,
                    // label: odd_unshift_ns.join(" ",)
                };
                tree.nodes.push(node);
                const edge = { 
                    from: current_label, 
                    to: label,
                    id: current_label + "->" + label,
                };
                tree.edges.push(edge);
                const next_ns = odd_ns.map(n => (n - 1) / 2);
                if (odd_ns.length > 1) {
                    to_process.push([node, next_ns, odd_unshift_ns]);
                } else {
                    node.label = "" + odd_unshift_ns[0];
                }
            }
        }
        // console.log("current to_process: " + to_process.length);
        // console.log(to_process.map(a => a[0]));
    }
    // console.log("tree nodes: " + tree.nodes.map(a => a.id));
    // console.log("tree edges: " + tree.edges.map(a => a.id));
    return tree;
}

/**
 * @param path
 * @param success
 * @param error
 */
function loadJSON(path, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        } else {
          error(xhr);
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
  }