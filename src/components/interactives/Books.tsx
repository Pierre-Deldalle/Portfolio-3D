import { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

type BooksProps = {
  scene: THREE.Group;
  onSelectSection: (section: string) => void;
};

export default function Books({
  scene,
  onSelectSection,
}: BooksProps) {
  useEffect(() => {
    // Récupère la pile de livres
    const books = scene.getObjectByName("LIVRE");

    if (!books) {
      console.warn("LIVRE introuvable dans le GLB");
      return;
    }

    // Récupère le canvas Three.js
    const canvas = document.querySelector("canvas");

    // Stocke les contours créés
    const outlines: THREE.Mesh[] = [];

    // Parcourt tous les meshes qui composent les livres
    books.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) {
        return;
      }

      // Crée un matériau uniquement pour le contour
      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffff",
        side: THREE.BackSide,
        transparent: true,
        opacity: 0,
      });

      // Crée une copie du mesh
      const outline = new THREE.Mesh(
        child.geometry,
        outlineMaterial
      );

      // Le contour est purement visuel
      // Il ne doit pas bloquer les clics
      outline.raycast = () => {};

      // Agrandit légèrement la copie
      outline.scale.set(1.08, 1.08, 1.08);

      // Reprend la transformation du mesh original
      outline.position.copy(child.position);
      outline.rotation.copy(child.rotation);
      outline.quaternion.copy(child.quaternion);

      // Ajoute le contour au même parent que le mesh original
      child.parent?.add(outline);

      outlines.push(outline);
    });

    // Lorsque la souris passe sur les livres
    const handleMouseEnter = () => {
      if (canvas) {
        canvas.style.cursor =
          'url("/cursors/pointer-gray.png") 8 2, pointer';
      }

      outlines.forEach((outline) => {
        const material =
          outline.material as THREE.MeshBasicMaterial;

        gsap.to(material, {
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      });
    };

    // Lorsque la souris quitte les livres
    const handleMouseLeave = () => {
      if (canvas) {
        canvas.style.cursor =
          'url("/cursors/cursor-gray.png") 4 4, auto';
      }

      outlines.forEach((outline) => {
        const material =
          outline.material as THREE.MeshBasicMaterial;

        gsap.to(material, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      });
    };

    // Lorsque l'utilisateur clique sur les livres
    const handleClick = () => {
      console.log("📚 Clic sur LIVRE");

      onSelectSection("studies");
    };

    // Rend les livres interactifs
    books.userData.handleMouseEnter = handleMouseEnter;
    books.userData.handleMouseLeave = handleMouseLeave;
    books.userData.handleClick = handleClick;

    // Nettoyage
    return () => {
      outlines.forEach((outline) => {
        outline.parent?.remove(outline);

        const material =
          outline.material as THREE.MeshBasicMaterial;

        material.dispose();
      });
    };
  }, [scene, onSelectSection]);

  return null;
}