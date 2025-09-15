import { Label } from "@/components/ui/label"
import useDashboard from "../../../../hooks/useDashboard"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { SavedFileCard } from "./saved-file-card"
import { useTranslations } from "next-intl"

export default function SavedFilesList() {
  const t = useTranslations('dashboard.profilesAndFiles')
  const {
    selectedProfile,
    savedFiles,
    handleDeleteSavedFile,
    handleEditSavedFile
  } = useDashboard()

  if (!selectedProfile) {
    return (
      <div className="space-y-3 flex flex-col h-full">
        <Label>{t('yourFiles')}:</Label>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
          <h3 className="text-xl font-semibold">{t('selectAProfile')}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('selectProfileToSeeFiles')}
          </p>
        </div>
      </div>
    )
  }

  const filesOfCurrentProfile = savedFiles.filter((file) => file.profileId === selectedProfile?.id)

  if (filesOfCurrentProfile.length === 0) {
    return (
      <div className="space-y-3 flex flex-col h-full">
        <Label>{t('yourFiles')}:</Label>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
          <h3 className="text-xl font-semibold">{t('noFilesYet')}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('generateFirstContentToSeeIt')}
          </p>
          <Button className="mt-6">
            <PlusCircle className="mr-2 h-4 w-4" /> {t('generateFirstContent')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Label>{t('yourFiles')}:</Label>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {filesOfCurrentProfile.map((savedFile) => (
          <SavedFileCard
            key={savedFile.id}
            savedFile={savedFile}
            onDelete={handleDeleteSavedFile}
            onEdit={handleEditSavedFile}
          />
        ))}
      </div>
    </div>
  )
}
