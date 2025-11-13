import { ExerciseTemplate, EXERCISES_DATABASE } from './exercises-database';

export interface WorkoutRequest {
  goal: string;
  experience: 'Iniciante' | 'Intermediário' | 'Avançado';
  equipment: string[];
  duration: number; // em minutos
  muscleGroups: string[];
  preferences?: string;
}

export interface GeneratedWorkout {
  name: string;
  description: string;
  exercises: ExerciseTemplate[];
  estimatedDuration: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  tips: string[];
}

export class AIWorkoutGenerator {
  private getExercisesByFilters(
    muscleGroups: string[],
    equipment: string[],
    difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  ): ExerciseTemplate[] {
    return EXERCISES_DATABASE.filter(exercise => {
      const matchesMuscleGroup = muscleGroups.length === 0 || 
        muscleGroups.includes(exercise.muscleGroup);
      
      const matchesEquipment = equipment.length === 0 || 
        equipment.includes(exercise.equipment);
      
      const matchesDifficulty = exercise.difficulty === difficulty || 
        (difficulty === 'Intermediário' && exercise.difficulty === 'Iniciante') ||
        (difficulty === 'Avançado' && ['Iniciante', 'Intermediário'].includes(exercise.difficulty));
      
      return matchesMuscleGroup && matchesEquipment && matchesDifficulty;
    });
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private generateWorkoutName(goal: string, muscleGroups: string[]): string {
    const goalNames: { [key: string]: string } = {
      'hipertrofia': 'Hipertrofia',
      'força': 'Força',
      'resistência': 'Resistência',
      'emagrecimento': 'Queima de Gordura',
      'condicionamento': 'Condicionamento',
      'funcional': 'Funcional'
    };

    const goalName = goalNames[goal.toLowerCase()] || 'Treino Personalizado';
    
    if (muscleGroups.length === 1) {
      return `${goalName} - ${muscleGroups[0]}`;
    } else if (muscleGroups.length === 2) {
      return `${goalName} - ${muscleGroups.join(' e ')}`;
    } else {
      return `${goalName} - Corpo Inteiro`;
    }
  }

  private generateWorkoutDescription(request: WorkoutRequest): string {
    const { goal, experience, duration, muscleGroups } = request;
    
    let description = `Treino de ${goal.toLowerCase()} para nível ${experience.toLowerCase()}. `;
    description += `Duração estimada: ${duration} minutos. `;
    
    if (muscleGroups.length > 0) {
      description += `Foco em: ${muscleGroups.join(', ')}. `;
    }
    
    description += 'Criado pelo IA Treinador Orbian para atender suas necessidades específicas.';
    
    return description;
  }

  private generateWorkoutTips(request: WorkoutRequest): string[] {
    const tips: string[] = [];
    
    // Tips baseados na experiência
    if (request.experience === 'Iniciante') {
      tips.push('Foque na técnica correta antes de aumentar o peso');
      tips.push('Descanse adequadamente entre as séries');
      tips.push('Mantenha-se hidratado durante todo o treino');
    } else if (request.experience === 'Intermediário') {
      tips.push('Varie a intensidade para evitar platôs');
      tips.push('Monitore sua progressão de carga');
      tips.push('Inclua exercícios compostos e isolados');
    } else {
      tips.push('Utilize técnicas avançadas com moderação');
      tips.push('Periodize seu treinamento');
      tips.push('Foque na qualidade do movimento mesmo com cargas altas');
    }
    
    // Tips baseados no objetivo
    if (request.goal.toLowerCase().includes('hipertrofia')) {
      tips.push('Mantenha o tempo sob tensão adequado');
      tips.push('Alimente-se bem para suportar o crescimento muscular');
    } else if (request.goal.toLowerCase().includes('força')) {
      tips.push('Priorize exercícios compostos');
      tips.push('Descanse mais tempo entre séries pesadas');
    } else if (request.goal.toLowerCase().includes('resistência')) {
      tips.push('Mantenha intervalos de descanso menores');
      tips.push('Foque na consistência do ritmo');
    }
    
    return tips;
  }

  public generateWorkout(request: WorkoutRequest): GeneratedWorkout {
    // Filtrar exercícios baseado nos critérios
    const availableExercises = this.getExercisesByFilters(
      request.muscleGroups,
      request.equipment,
      request.experience
    );

    if (availableExercises.length === 0) {
      throw new Error('Nenhum exercício encontrado com os critérios especificados');
    }

    // Determinar número de exercícios baseado na duração
    let numberOfExercises: number;
    if (request.duration <= 30) {
      numberOfExercises = 4;
    } else if (request.duration <= 45) {
      numberOfExercises = 6;
    } else if (request.duration <= 60) {
      numberOfExercises = 8;
    } else {
      numberOfExercises = 10;
    }

    // Selecionar exercícios aleatoriamente
    const shuffledExercises = this.shuffleArray(availableExercises);
    const selectedExercises = shuffledExercises.slice(0, numberOfExercises);

    // Gerar informações do treino
    const workoutName = this.generateWorkoutName(request.goal, request.muscleGroups);
    const workoutDescription = this.generateWorkoutDescription(request);
    const workoutTips = this.generateWorkoutTips(request);

    return {
      name: workoutName,
      description: workoutDescription,
      exercises: selectedExercises,
      estimatedDuration: request.duration,
      difficulty: request.experience,
      tips: workoutTips
    };
  }

  public generateMultipleWorkouts(request: WorkoutRequest, count: number = 3): GeneratedWorkout[] {
    const workouts: GeneratedWorkout[] = [];
    
    for (let i = 0; i < count; i++) {
      try {
        const workout = this.generateWorkout(request);
        // Adicionar variação no nome para diferenciar
        workout.name += ` - Opção ${i + 1}`;
        workouts.push(workout);
      } catch (error) {
        console.error(`Erro ao gerar treino ${i + 1}:`, error);
      }
    }
    
    return workouts;
  }
}

// Instância singleton para uso em toda a aplicação
export const aiWorkoutGenerator = new AIWorkoutGenerator();