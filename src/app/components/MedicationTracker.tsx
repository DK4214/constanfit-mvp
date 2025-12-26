"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Clock, CheckCircle2, Pill } from "lucide-react";
import { toast } from "sonner";

interface Medication {
  id: string;
  name: string;
  time: string;
  taken: boolean;
  timestamp: string;
}

interface MedicationTrackerProps {
  onActivity: () => void;
}

export default function MedicationTracker({ onActivity }: MedicationTrackerProps) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medicationName, setMedicationName] = useState("");
  const [medicationTime, setMedicationTime] = useState("");

  useEffect(() => {
    loadTodayMedications();
  }, []);

  const loadTodayMedications = () => {
    const today = new Date().toDateString();
    const savedMedications = localStorage.getItem("constantfit_medications");
    
    if (savedMedications) {
      const allMedications: Medication[] = JSON.parse(savedMedications);
      const todayMedications = allMedications.filter(
        (med) => new Date(med.timestamp).toDateString() === today
      );
      setMedications(todayMedications);
    }
  };

  const addMedication = () => {
    if (!medicationName.trim()) {
      toast.error("Digite o nome da medicação");
      return;
    }

    if (!medicationTime) {
      toast.error("Selecione o horário");
      return;
    }

    const newMedication: Medication = {
      id: Date.now().toString(),
      name: medicationName,
      time: medicationTime,
      taken: false,
      timestamp: new Date().toISOString(),
    };

    const savedMedications = localStorage.getItem("constantfit_medications");
    const allMedications: Medication[] = savedMedications ? JSON.parse(savedMedications) : [];
    allMedications.push(newMedication);
    
    localStorage.setItem("constantfit_medications", JSON.stringify(allMedications));
    setMedications([...medications, newMedication]);
    
    // Limpar formulário
    setMedicationName("");
    setMedicationTime("");
    
    toast.success("Medicação adicionada!");
  };

  const toggleTaken = (id: string) => {
    const savedMedications = localStorage.getItem("constantfit_medications");
    if (savedMedications) {
      const allMedications: Medication[] = JSON.parse(savedMedications);
      const updatedMedications = allMedications.map((med) =>
        med.id === id ? { ...med, taken: !med.taken } : med
      );
      localStorage.setItem("constantfit_medications", JSON.stringify(updatedMedications));
      
      const updatedMed = updatedMedications.find((med) => med.id === id);
      setMedications(
        medications.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med))
      );
      
      if (updatedMed?.taken) {
        onActivity();
        toast.success("Medicação marcada como tomada!");
      }
    }
  };

  const deleteMedication = (id: string) => {
    const savedMedications = localStorage.getItem("constantfit_medications");
    if (savedMedications) {
      const allMedications: Medication[] = JSON.parse(savedMedications);
      const updatedMedications = allMedications.filter((med) => med.id !== id);
      localStorage.setItem("constantfit_medications", JSON.stringify(updatedMedications));
      setMedications(medications.filter((med) => med.id !== id));
      toast.success("Medicação removida");
    }
  };

  const takenCount = medications.filter((med) => med.taken).length;
  const totalCount = medications.length;

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <Card className="border-purple-200 shadow-lg">
        <CardHeader>
          <CardTitle>Resumo de hoje</CardTitle>
          <CardDescription>Acompanhamento de medicações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <CheckCircle2 className="w-8 h-8 text-purple-600" />
              <p className="text-4xl font-bold text-purple-600">
                {takenCount}/{totalCount}
              </p>
            </div>
            <p className="text-gray-600">Medicações tomadas hoje</p>
          </div>
        </CardContent>
      </Card>

      {/* Adicionar medicação */}
      <Card className="border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle>Adicionar medicação</CardTitle>
          <CardDescription>Registre suas medicações diárias</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="medicationName">Nome da medicação</Label>
            <Input
              id="medicationName"
              placeholder="Ex: Vitamina D, Ômega 3..."
              value={medicationName}
              onChange={(e) => setMedicationName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicationTime">Horário</Label>
            <Input
              id="medicationTime"
              type="time"
              value={medicationTime}
              onChange={(e) => setMedicationTime(e.target.value)}
            />
          </div>

          <Button
            onClick={addMedication}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar medicação
          </Button>
        </CardContent>
      </Card>

      {/* Lista de medicações */}
      {medications.length > 0 && (
        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle>Medicações de hoje</CardTitle>
            <CardDescription>{medications.length} medicação(ões) registrada(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {medications
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((medication) => (
                  <div
                    key={medication.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      medication.taken
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Checkbox
                        checked={medication.taken}
                        onCheckedChange={() => toggleTaken(medication.id)}
                        className="w-6 h-6"
                      />
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            medication.taken
                              ? "text-green-700 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {medication.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <p className="text-sm text-gray-600">{medication.time}</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => deleteMedication(medication.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {medications.length === 0 && (
        <Card className="border-gray-200 shadow-lg">
          <CardContent className="py-12 text-center">
            <Pill className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhuma medicação registrada hoje</p>
            <p className="text-sm text-gray-500 mt-1">
              Adicione suas medicações para acompanhar melhor sua rotina
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
