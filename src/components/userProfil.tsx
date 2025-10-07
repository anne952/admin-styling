import React, { useState } from 'react';


type UserProfileProps = {
  imageUrl: string;
  name: string;
  email: string;
  onPhotoUpdate?: (newUrl: string) => void;
};

const UserProfile: React.FC<UserProfileProps> = ({ imageUrl, name, email, onPhotoUpdate }) => {
  const [currentName, setCurrentName] = useState(name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleNameChange = () => {
    setCurrentName(newName);
    setIsEditingName(false);
    setNewName('');
  };

  const handlePasswordChange = () => {
    if (password === confirmPassword && password.length > 0) {
      // Ici vous pouvez ajouter la logique de changement de mot de passe
      alert('Mot de passe changé avec succès !');
      setIsChangingPassword(false);
      setPassword('');
      setConfirmPassword('');
    } else {
      alert('Les mots de passe ne correspondent pas ou sont vides.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-4">
          <img id="user-avatar" src={imageUrl} alt="Profile" className="w-16 h-16 rounded-full object-cover mr-72" />
          <div className="flex flex-col gap-2">
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploading(true);
              const reader = new FileReader();
              reader.onload = (event) => {
                const dataUrl = event.target?.result as string;
                (document.querySelector('#user-avatar') as HTMLImageElement)?.setAttribute('src', dataUrl);
                if (onPhotoUpdate) onPhotoUpdate(dataUrl);
                setUploading(false);
              };
              reader.readAsDataURL(file);
            }} className="text-sm" />
            {uploading && <span className="text-xs text-gray-500">Chargement...</span>}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{currentName}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Identité</h3>
          {!isEditingName ? (
            <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded" onClick={() => setIsEditingName(true)}>Changer le nom</button>
          ) : (
            <div className="flex items-center gap-2">
              <input
                className="border rounded px-3 py-2 w-full"
                type="text"
                value={newName}
                placeholder="Nouveau nom"
                onChange={e => setNewName(e.target.value)}
              />
              <button className="px-3 py-2 text-sm bg-green-600 text-white rounded" onClick={handleNameChange}>Valider</button>
              <button className="px-3 py-2 text-sm bg-gray-200 rounded" onClick={() => setIsEditingName(false)}>Annuler</button>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Sécurité</h3>
          {!isChangingPassword ? (
            <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded" onClick={() => setIsChangingPassword(true)}>Changer le mot de passe</button>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input
                className="border rounded px-3 py-2"
                type="password"
                value={password}
                placeholder="Nouveau mot de passe"
                onChange={e => setPassword(e.target.value)}
              />
              <input
                className="border rounded px-3 py-2"
                type="password"
                value={confirmPassword}
                placeholder="Confirmer le mot de passe"
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm bg-green-600 text-white rounded" onClick={handlePasswordChange}>Valider</button>
                <button className="px-3 py-2 text-sm bg-gray-200 rounded" onClick={() => setIsChangingPassword(false)}>Annuler</button>
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Préférences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span>Thème sombre</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Recevoir des emails</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Notifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span>Produits supprimés</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span>Nouvelles notifications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
