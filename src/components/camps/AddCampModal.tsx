"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CampFormData, CampLevel } from "@/types/camp";
import { useTranslation } from '@/hooks/useTranslation';

interface AddCampModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CampFormData) => void;
  initialData?: CampFormData | null;
}

const campLevels: CampLevel[] = [
  "U7",
  "U9",
  "U11",
  "U13",
  "U15",
  "U18",
  "Junior",
  "Senior",
  "M15",
  "M13",
];

export function AddCampModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AddCampModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    level: "" as CampLevel,
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        level: initialData.level,
        location: initialData.location,
        startDate: initialData.startDate,
        endDate: initialData.endDate,
        description: initialData.description,
        isActive: initialData.isActive,
      });
    } else {
      setFormData({
        name: "",
        level: "" as CampLevel,
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        isActive: true,
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('validation.required');
    if (!formData.level) newErrors.level = t('validation.required');
    if (!formData.location.trim())
      newErrors.location = t('validation.required');
    if (!formData.startDate)
      newErrors.startDate = t('validation.required');
    if (!formData.endDate) newErrors.endDate = t('validation.required');
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) >= new Date(formData.endDate)
    ) {
      newErrors.endDate = t('validation.invalidDate');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit({
      name: formData.name,
      level: formData.level,
      location: formData.location,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      isActive: formData.isActive,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {initialData ? t('camps.editCamp') : t('camps.createCamp')}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {t('camps.configureCamp')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-3">
              {t('camps.campInformation')}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('camps.campName')} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t('camps.campNamePlaceholder')}
                    className={errors.name ? "border-red-500" : ""}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="level">{t('camps.level')} *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      setFormData({ ...formData, level: value as CampLevel })
                    }
                    required
                  >
                    <SelectTrigger
                      id="level"
                      className={errors.level ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder={t('camps.selectLevel')} />
                    </SelectTrigger>
                    <SelectContent>
                      {campLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.level && (
                    <p className="text-sm text-red-600 mt-1">{errors.level}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="location">{t('camps.location')} *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder={t('camps.locationPlaceholder')}
                    className={errors.location ? "border-red-500" : ""}
                    required
                  />
                  {errors.location && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">{t('camps.startDate')} *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className={errors.startDate ? "border-red-500" : ""}
                      required
                    />
                    {errors.startDate && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.startDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="endDate">{t('camps.endDate')} *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      min={formData.startDate}
                      className={errors.endDate ? "border-red-500" : ""}
                      required
                    />
                    {errors.endDate && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.endDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <Label htmlFor="description">{t('camps.description')} *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder={t('camps.descriptionPlaceholder')}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900 sm:text-sm px-3 py-2 border min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {initialData ? t('camps.updateCamp') : t('camps.createCamp')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
