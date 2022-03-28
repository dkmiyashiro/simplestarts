
function Disc(n) {

    this.name = "disc";

    this.numVertices = (n * 3);
    this.numTriangles = n;

    this.vertices = [];
    this.colors = [];
    this.texCoords = [];
    this.normals = [];

    // Local variables: unique vertices and colors.
    ////////////////////////////////////////////////////////////
        for (var i = 0; i < n; i++) {
            this.vertices.push(vec4(Math.cos(i * (2 * (Math.PI / n))),  0.0, Math.sin(i * (2 * (Math.PI / n))), 1.0));
            this.vertices.push(vec4(0.0, 0.0, 0.0, 1.0));
            this.vertices.push(vec4(Math.cos((i + 1) * (2 * (Math.PI / n))), 0.0, Math.sin((i + 1) * (2 * (Math.PI / n)), 1.0)));

            this.normals.push(vec4(0,1,0,0));
            this.normals.push(vec4(0,1,0,0));
            this.normals.push(vec4(0,1,0,0));
            
            this.texCoords.push(vec2(   (.5*   (Math.cos(i * (2 * (Math.PI / n)))))+.5    , (.5 *(Math.sin(i * (2 * (Math.PI / n)))))+.5     ));
            this.texCoords.push(vec2(.5,.5));
            this.texCoords.push(vec2(   (.5*   (Math.cos((i + 1) * (2 * (Math.PI / n)))))+.5   , (.5 * (Math.sin((i + 1) * (2 * (Math.PI / n)))))+.5   ));
        }

        for (var i = 0; i < n * 3; i++) {
            this.colors.push(vec4(Math.cos(i * (2 * (Math.PI / n))), Math.sin(i * (2 * (Math.PI / n))), 0.0, 1.0));
            this.colors.push(vec4(1.0, 1.0, 1.0, 1.0));
            this.colors.push(vec4(Math.cos(i * (2 * (Math.PI / n))), Math.sin(i * (2 * (Math.PI / n))), 0.0, 1.0));
        }
}
