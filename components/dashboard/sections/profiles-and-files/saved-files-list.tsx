import { Label } from "@/components/ui/label"
import useDashboard from "../../context/useDashboard"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { SavedFileCard } from "./saved-file-card"

export default function SavedFilesList() {
  const {
    selectedProfile,
    savedFiles,
    handleDeleteSavedFile,
    handleEditSavedFile
  } = useDashboard()

  if (!selectedProfile) {
    return (
      <div className="space-y-3 flex flex-col h-full">
        <Label>Archivos generados:</Label>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
          <h3 className="text-xl font-semibold">Selecciona un perfil</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Selecciona un perfi para ver su contenido generado aqui.
          </p>
        </div>
      </div>
    )
  }

  const filesOfCurrentProfile = savedFiles.filter((file) => file.profileId === selectedProfile?.id)

  if (filesOfCurrentProfile.length === 0) {
    return (
      <div className="space-y-3 flex flex-col h-full">
        <Label>Archivos generados:</Label>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center">
          <h3 className="text-xl font-semibold">No tienes archivos generados con este perfil</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Crea tu primer contenido para verlo aqui.
          </p>
          <Button className="mt-6">
            <PlusCircle className="mr-2 h-4 w-4" /> Generar Primer Contenido
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Label>Archivos generados:</Label>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
