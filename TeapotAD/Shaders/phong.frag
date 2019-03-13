#version 430

in vec3 vertPos;
in vec3 N;
in vec3 lightPos;
/*TODO:: Complete your shader code for a full Phong shading*/ 

uniform vec3 Kd;            // Diffuse reflectivity
uniform vec3 Ld;            // Diffuse light intensity

uniform vec3 Ka;
uniform vec3 La;

uniform vec3 Ks;			//RGB 
uniform vec3 Ls;

uniform vec3 cameraPos;
// complete to a full phong shading
layout( location = 0 ) out vec4 FragColour;

void main() {

   //Calculate the light vector
   vec3 L = normalize(lightPos - vertPos);  //What is this code doing?
    
   //calculate Diffuse Light Intensity making sure it is not negative and is clamped 0 to 1  
   vec4 Id = vec4(Ld,1.0) * max(dot(N,L), 0.0);// Why do we need vec4(vec3)?
   Id = Id * vec4(Kd, 1.0);

   //Ambient
   vec4 Ia = vec4(La * Ka,1.0);

   //view direction
   vec3 Vr = normalize(cameraPos - vertPos );

   //reflect
   vec3 r = reflect(-L,N);

   float spec = pow(max(dot(Vr, r), 0.0), 4.0);

   //specular
   vec4 Is = vec4(Ks* Ls, 1.0) * spec;
  
  // FragColour = ambient + diffuse + specular
   FragColour = clamp(Ia + Id + Is, 0.0, 1.0);
  

}
