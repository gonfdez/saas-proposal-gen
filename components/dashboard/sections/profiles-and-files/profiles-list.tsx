import { Label } from "@/components/ui/label"
import useDashboard from "../../context/useDashboard"
import { ProfileCard } from "./profile-card"

export default function ProfilesList() {
  const {
    profiles,
    selectedProfile,
    setSelectedProfile,
    handleDeleteProfile,
    handleEditProfile
  } = useDashboard()

  return (
    <div className="space-y-3">
      <Label>Tus perfiles:</Label>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onDelete={handleDeleteProfile}
            onEdit={handleEditProfile}
            showBadge={profile.id === selectedProfile?.id}
            onClick={() => setSelectedProfile(profile)}
            badgeText="Seleccionado"
          />
        ))}
      </div>
    </div>
  )
}
