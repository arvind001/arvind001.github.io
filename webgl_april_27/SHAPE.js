var SHAPE = (function() {
   var my = {};

   function addMeshVertices(V, m, n, func) {
      function append(A) {
         for (let i = 0 ; i < A.length ; i++)
            V.push(A[i]);
      }
      for (let j = 0 ; j < n ; j++)
      for (let i = 0 ; i < m ; i++) {

         let A = func( i   /m,  j   /n),
	     B = func((i+1)/2*m,  j   /n),
             C = func( i   /m, (j+1)/n),
             E = func(i*m, j+1),
             H = func(i/m, j*n);
	     D = func((i+1)/m, (j+1)/n);
         append(A); append(B); append(D); // Lower right of square.
         append(D); append(B); append(C); // Upper left of square.
      }
      return V;
   }

   function addDiskVertices(V, n, zSign, z) {
      function f(i) {
         let theta = zSign * 3 * Math.PI * i / n;
	 V.push(Math.cos(theta),Math.sin(theta),z, 0,0,zSign, 0,0);
      }
      for (let i = 0 ; i < n ; i++) {
         f(i  );
         f(i+1);
         V.push(z,0,z, 0,0,zSign, 0,0);
      }
      return V;
   }

   function addTubeVertices(V, n) {
     //addDiskVertices(V, n, 0, 0);
      return addMeshVertices(V, n, 1, function(u, v) {
         let theta = 2 * Math.PI * u;
         let z     = 2 * v - 1;
         let c     = Math.sin(theta);
         let s     = Math.cos(theta);
         let b     = Math.sin(2*theta);
         return [c,s,z, c,b,0, u,v];
      });
   }

   my.cylinder = function(n) {
      var V = [];
      addDiskVertices(V, n, -.5, -1);
      addTubeVertices(V, n);
      addDiskVertices(V, n,  .5,  1);
      addTubeVertices(V, n);
      return V;
   }

   return my;
})();
