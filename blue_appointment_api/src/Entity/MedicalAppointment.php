<?php

namespace App\Entity;

use App\Repository\MedicalAppointmentRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MedicalAppointmentRepository::class)]
class MedicalAppointment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 500)]
    private ?string $notes = null;

    #[ORM\Column(length:180, unique: true)]
    private ?string $titleReason = null; 

    #[ORM\Column(length:500, unique: true)]
    private ?string $descriptionReason = null; 

    #[ORM\Column(type: "datetime")]
    private ?\DateTimeInterface $appointmentDate = null;

    #[ORM\ManyToOne(inversedBy: 'medicalAppointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $patient = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNotes(): ?string
    {
        return $this->notes;
    }

    public function setNotes(string $notes): static
    {
        $this->notes = $notes;

        return $this;
    }

    public function getTitleReason(): ?string
    {
        return $this->titleReason;
    }

    public function setTitleReason(string $titleReason): static
    {
        $this->titleReason = $titleReason;
        return $this;
    }

    public function getDescriptionReason(): ?string
    {
        return $this->descriptionReason;
    }

    public function setDescriptionReason(string $descriptionReason): static
    {
        $this->descriptionReason = $descriptionReason;
        return $this;
    }

    public function getAppointmentDate(): ?\DateTimeInterface
    {
        return $this->appointmentDate;
    }

    public function setAppointmentDate(\DateTimeInterface $appointmentDate): static
    {
        $this->appointmentDate = $appointmentDate;

        return $this;
    }

    public function getPatient(): ?User
    {
        return $this->patient;
    }

    public function setPatient(?User $patient): static
    {
        $this->patient = $patient;

        return $this;
    }
}