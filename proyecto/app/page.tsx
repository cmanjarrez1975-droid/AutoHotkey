import LearningWorkspace from './learning/workspace';
import { publicLessons } from './learning/catalog';
import { cases } from './learning/cases';

export default function Home() {
  return <LearningWorkspace lessons={publicLessons()} caseList={cases.map(({id,title,lessonId})=>({id,title,lessonId}))} />;
}
