// Types pour les données de la table
export interface TableItem {
  id: string | number;
  nom?: string;
  description?: string;
  urlImage?: string;
  prix?: number;
  [key: string]: any;
}

// Interface pour les actions
export interface TableActions {
  onDelete: (id: string | number) => void;
  onEdit: (item: TableItem) => void;
  onValidate: (id: string | number) => void;
}

// Stockage local pour simuler une base de données
let localData: TableItem[] = [];

// Fonction pour initialiser les données
export const initializeData = (data: TableItem[]) => {
  localData = [...data];
  return localData;
};

// Fonction pour obtenir toutes les données
export const getAllData = (): TableItem[] => {
  return [...localData];
};

// Fonction pour supprimer un élément
export const deleteItem = async (id: string | number): Promise<boolean> => {
  try {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Suppression de l'élément dans les données locales
    const initialLength = localData.length;
    localData = localData.filter(item => item.id !== id);
    
    // Vérification si la suppression a réussi
    const success = localData.length < initialLength;
    
    if (success) {
      console.log(`✅ Élément avec l'ID ${id} supprimé avec succès`);
      console.log('📊 Données mises à jour:', localData);
    } else {
      console.log(`❌ Élément avec l'ID ${id} non trouvé`);
    }
    
    return success;
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
    return false;
  }
};

// Fonction pour modifier un élément
export const editItem = async (item: TableItem): Promise<boolean> => {
  try {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Recherche et modification de l'élément
    const index = localData.findIndex(dataItem => dataItem.id === item.id);
    
    if (index !== -1) {
      // Mise à jour de l'élément
      localData[index] = { ...localData[index], ...item };
      console.log('✅ Élément modifié avec succès:', localData[index]);
      console.log('📊 Données mises à jour:', localData);
      return true;
    } else {
      console.log(`❌ Élément avec l'ID ${item.id} non trouvé`);
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur lors de la modification:', error);
    return false;
  }
};

// Fonction pour valider un élément
export const validateItem = async (id: string | number): Promise<boolean> => {
  try {
    // Simulation d'un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Recherche et validation de l'élément
    const index = localData.findIndex(item => item.id === id);
    
    if (index !== -1) {
      // Ajout du statut validé
      localData[index] = { ...localData[index], status: 'validated', validatedAt: new Date().toISOString() };
      console.log('✅ Élément validé avec succès:', localData[index]);
      console.log('📊 Données mises à jour:', localData);
      return true;
    } else {
      console.log(`❌ Élément avec l'ID ${id} non trouvé`);
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur lors de la validation:', error);
    return false;
  }
};

// Fonction utilitaire pour gérer les actions avec confirmation
export const handleTableAction = {
  // Supprimer avec confirmation
  delete: async (id: string | number, itemName?: string): Promise<boolean> => {
    const confirmMessage = itemName 
      ? `Êtes-vous sûr de vouloir supprimer "${itemName}" ?`
      : 'Êtes-vous sûr de vouloir supprimer cet élément ?';
    
    if (window.confirm(confirmMessage)) {
      const success = await deleteItem(id);
      if (success) {
        alert('✅ Élément supprimé avec succès !');
        return true;
      } else {
        alert('❌ Erreur lors de la suppression.');
        return false;
      }
    }
    return false;
  },

  // Modifier avec formulaire
  edit: async (item: TableItem): Promise<boolean> => {
    // Création d'un formulaire simple pour la modification
    const newNom = prompt('Nouveau nom:', item.nom || '');
    const newDescription = prompt('Nouvelle description:', item.description || '');
    const newPrix = prompt('Nouveau prix:', item.prix?.toString() || '');
    
    if (newNom !== null && newDescription !== null && newPrix !== null) {
      const updatedItem = {
        ...item,
        nom: newNom,
        description: newDescription,
        prix: parseFloat(newPrix) || item.prix,
        updatedAt: new Date().toISOString()
      };
      
      const success = await editItem(updatedItem);
      if (success) {
        alert('✅ Élément modifié avec succès !');
        return true;
      } else {
        alert('❌ Erreur lors de la modification.');
        return false;
      }
    }
    return false;
  },

  // Valider
  validate: async (id: string | number): Promise<boolean> => {
    const success = await validateItem(id);
    if (success) {
      alert('✅ Élément validé avec succès !');
      return true;
    } else {
      alert('❌ Erreur lors de la validation.');
      return false;
    }
  }
};

// Hook personnalisé pour les actions de table avec gestion d'état
export const useTableActions = () => {
  const handleDelete = async (id: string | number, itemName?: string) => {
    const success = await handleTableAction.delete(id, itemName);
    if (success) {
      // Ici vous pouvez déclencher un re-render de votre composant
      // en utilisant un state ou en appelant une fonction de callback
      console.log('🔄 Rechargement des données recommandé');
    }
    return success;
  };

  const handleEdit = async (item: TableItem) => {
    const success = await handleTableAction.edit(item);
    if (success) {
      console.log('🔄 Rechargement des données recommandé');
    }
    return success;
  };

  const handleValidate = async (id: string | number) => {
    const success = await handleTableAction.validate(id);
    if (success) {
      console.log('🔄 Rechargement des données recommandé');
    }
    return success;
  };

  return {
    handleDelete,
    handleEdit,
    handleValidate,
    getAllData,
    initializeData
  };
};
