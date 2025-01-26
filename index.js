class Knight {
    constructor(_position = [0,0]){
        this.position = _position;
        // Valid directions this piece can move
        this.directions = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
    }

    getPosition() {
        return this.position;
    }

    move(dest) {
        // First check if the destination is valid
        if (!isValidPosition(dest[0], dest[1])) return "Invalid destination";

        // Check if we are already on the destination
        if(dest[0] === this.position[0] && dest[1] === this.position[1]) return "No movement needed";

        // Init a BFS queue with the current position as the first path
        const queue = [[this.position]]; 

        // Use a set to avoid revisiting a position
        const visited = new Set();
        visited.add(this.position.toString()); // add the current position to the set

        // While the queue is not empty
        while (queue.length > 0) {
            const path = queue.shift(); // Get the path
            console.log(queue);

            // Check if the current position is the destination
            const currentPosition = path[path.length - 1];
            if(currentPosition[0] === dest[0] && currentPosition[1] === dest[1]) {
                pathPrint(path);
                this.position = currentPosition;
                return path;
            }

            // Explore all possible moves from the current position
            this.directions.forEach((dir) => {
                // Calculate the new position
                const newX = currentPosition[0] + dir[0];
                const newY = currentPosition[1] + dir[1];
                const newPos = [newX, newY];

                // Check that the new position is valid and has not been visited
                if(isValidPosition(newX, newY) && !visited.has(newPos.toString())){
                    visited.add(newPos.toString());
                    queue.push([...path, newPos]);
                }
            });
        }

        // If the BFS completes without finding a path, return with a message saying no path was found
        return "Path not found";
    }

    
}

// Utility function to check if the x/y position is within the board
function isValidPosition(x, y) {
    return x >= 0 && x < 8 && y >=0 && y < 8;
}

// Utility function to print the path a piece took to get to their destination in a readable format
function pathPrint(path) {
    // Join each position in the path array as a string
    const pathString = path.map(pos => `[${pos[0]},${pos[1]}]`).join(', ');
    
    // Print the formatted path
    console.log(`Path found: ${pathString}`);
}

const knight = new Knight([0,0]);
knight.move([7,7]);
