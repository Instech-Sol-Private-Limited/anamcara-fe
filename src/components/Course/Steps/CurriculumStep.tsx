import React, { useState } from 'react';
import { Plus, Edit, Trash2, ChevronDown, ChevronRight, Contrast as DragDropContext, Droplet as Droppable, Cable as Draggable } from 'lucide-react';
import { Course, Section, Lesson } from '../../../types/course';

interface CurriculumStepProps {
  courseData: Partial<Course>;
  setCourseData: (data: Partial<Course>) => void;
}

const CurriculumStep: React.FC<CurriculumStepProps> = ({ courseData, setCourseData }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      course_id: courseData.id || '',
      title: 'New Section',
      description: '',
      sort_order: (courseData.sections || []).length,
      is_published: false,
      lessons: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setCourseData({
      ...courseData,
      sections: [...(courseData.sections || []), newSection]
    });
    setEditingSection(newSection.id);
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    setCourseData({
      ...courseData,
      sections: (courseData.sections || []).map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    });
  };

  const deleteSection = (sectionId: string) => {
    setCourseData({
      ...courseData,
      sections: (courseData.sections || []).filter(section => section.id !== sectionId)
    });
  };

  const addLesson = (sectionId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      section_id: sectionId,
      title: 'New Lesson',
      type: 'video',
      description: '',
      content_url: '',
      content_text: '',
      duration_minutes: 0,
      is_preview: false,
      sort_order: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setCourseData({
      ...courseData,
      sections: (courseData.sections || []).map(section =>
        section.id === sectionId
          ? { ...section, lessons: [...section.lessons, newLesson] }
          : section
      )
    });
    setEditingLesson(newLesson.id);
  };

  const updateLesson = (sectionId: string, lessonId: string, updates: Partial<Lesson>) => {
    setCourseData({
      ...courseData,
      sections: (courseData.sections || []).map(section =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map(lesson =>
                lesson.id === lessonId ? { ...lesson, ...updates } : lesson
              )
            }
          : section
      )
    });
  };

  const deleteLesson = (sectionId: string, lessonId: string) => {
    setCourseData({
      ...courseData,
      sections: (courseData.sections || []).map(section =>
        section.id === sectionId
          ? { ...section, lessons: section.lessons.filter(lesson => lesson.id !== lessonId) }
          : section
      )
    });
  };

  const getTotalDuration = () => {
    return (courseData.sections || []).reduce((total, section) => {
      return total + section.lessons.reduce((sectionTotal, lesson) => {
        return sectionTotal + (lesson.duration_minutes || 0);
      }, 0);
    }, 0);
  };

  const getTotalLessons = () => {
    return (courseData.sections || []).reduce((total, section) => {
      return total + section.lessons.length;
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-blue-400 font-mono">Course Curriculum</h3>
          <p className="text-sm text-slate-400">
            {(courseData.sections || []).length} sections • {getTotalLessons()} lessons • {getTotalDuration()} minutes
          </p>
        </div>
        <button
          onClick={addSection}
          className="bg-blue-600 text-white px-4 py-2 font-mono rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Section</span>
        </button>
      </div>

      <div className="space-y-4">
        {(courseData.sections || []).map((section, sectionIndex) => (
          <div key={section.id} className="border border-amber-500/50 bg-slate-900/50  font-mono rounded-lg">
            <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {editingSection === section.id ? (
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      onBlur={() => setEditingSection(null)}
                      onKeyPress={(e) => e.key === 'Enter' && setEditingSection(null)}
                      className="font-semibold text-slate-400  border border-amber-500/50 bg-slate-900/50  font-mono rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <h4 className="font-semibold text-slate-400 font-mono">{section.title}</h4>
                  )}
                  
                  <span className="text-sm text-slate-400 font-mono">
                    {section.lessons.length} lessons
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingSection(section.id)}
                    className="p-1 text-slate-400 hover:text-blue-600 hover:bg-amber-500/50 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSection(section.id)}
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {expandedSections.includes(section.id) && (
              <div className="p-4 space-y-3">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{lessonIndex + 1}</span>
                      </div>
                      
                      {editingLesson === lesson.id ? (
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => updateLesson(section.id, lesson.id, { title: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                            placeholder="Lesson title"
                          />
                          <div className="flex space-x-2">
                            <select
                              value={lesson.type}
                              onChange={(e) => updateLesson(section.id, lesson.id, { type: e.target.value as any })}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="video">Video</option>
                              <option value="text">Text</option>
                              <option value="quiz">Quiz</option>
                              <option value="assignment">Assignment</option>
                              <option value="download">Download</option>
                            </select>
                            <input
                              type="number"
                              value={lesson.duration_minutes || 0}
                              onChange={(e) => updateLesson(section.id, lesson.id, { duration_minutes: parseInt(e.target.value) })}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                              placeholder="Duration"
                            />
                            <label className="flex items-center space-x-1">
                              <input
                                type="checkbox"
                                checked={lesson.is_preview}
                                onChange={(e) => updateLesson(section.id, lesson.id, { is_preview: e.target.checked })}
                              />
                              <span className="text-sm">Preview</span>
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{lesson.title}</p>
                          <p className="text-sm text-gray-500">
                            {lesson.type} • {lesson.duration_minutes || 0} min
                            {lesson.is_preview && ' • Preview'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {editingLesson === lesson.id ? (
                        <button
                          onClick={() => setEditingLesson(null)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => setEditingLesson(lesson.id)}
                            className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteLesson(section.id, lesson.id)}
                            className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => addLesson(section.id)}
                  className="w-full p-3 text-slate-400 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lesson</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {(courseData.sections || []).length === 0 && (
        <div className="text-center py-12 bg-slate-950 rounded-lg">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-slate-400 mb-2">No sections yet</h3>
          <p className="text-slate-400 mb-4">Start building your course curriculum by adding sections</p>
          <button
            onClick={addSection}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Section
          </button>
        </div>
      )}
    </div>
  );
};

export default CurriculumStep;