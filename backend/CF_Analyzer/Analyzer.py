import requests, plotly.graph_objs as go,numpy as np
from flask import Flask, render_template, request, jsonify
from datetime import datetime,timedelta
from operator import itemgetter


class Analyzer:

    def __init__(self,handle):
        self.handle=handle
        self.user_info=requests.get(f'https://codeforces.com/api/user.info?handles={handle}&checkHistoricHandles=false').json()
        
        if self.user_info['status'] != "OK":
            raise Exception("Failed to get User")
        
        self.user_status=requests.get(f'https://codeforces.com/api/user.status?handle={handle}').json()
        
        self.rating_data = requests.get(f' https://codeforces.com/api/user.rating?handle={handle}').json()
     

    def get_info(self):
        info=dict()
        # print(self.user_status)
        tried=len(set([item['problem']['name'] for item in self.user_status['result'] if item['problem'] is not None]))
        info['tried']=tried
        solved=len([item for item in self.user_status['result'] if item['verdict']=='OK'])
        info['solved']=solved
        attempts=float(len(self.user_status['result']))/float(solved)
        info['avg attempts']=float(f'{attempts:.2f}')
        first_sub=0
        problem=set()
        max_sub={}
        for items in reversed(self.user_status['result']):
            if items['verdict']=='OK' and items['problem']['name'] not in problem:
                first_sub+=1
            if items['verdict']=='OK':
                max_sub[items['problem']['name']]=max_sub.get(items['problem']['name'],0)+1
            problem.add(items['problem']['name'])

        max_ac=0
        for value in max_sub.values():
            max_ac=max(value,max_ac)

        info['max_ac']=max_ac
        info['first_sub']=first_sub
        info.update(self.user_info['result'][0])

        return info


    def stalk_hardest(self):
        self.sorted_hard=[]
        problems=set()
        if self.user_status['status']=='OK':
            hard=[]
            for items in self.user_status['result']:
                if items['verdict']=='OK' and 'rating' in items['problem'] and items['problem']['name'] not in problems:

                    l1=[items['problem']['rating'],items['problem']['name'],str((datetime.utcnow()-datetime.utcfromtimestamp(items['creationTimeSeconds'])).days),items['author']['participantType'],items['relativeTimeSeconds']]
                    problems.add(items['problem']['name'])
                    hard.append(l1)
            
            self.sorted_hard=sorted(hard,key=itemgetter(0,2),reverse=True)
           
            contest_hard=[item for item in self.sorted_hard if item[3]=='CONTESTANT']
            
            fast_solve=dict()
            for items in self.sorted_hard:
                if (items[3]=='CONTESTANT'):
                    if items[0] in fast_solve:
                        fast_solve[items[0]]= fast_solve.get(items[0]) if fast_solve.get(items[0])[1]<str(timedelta(seconds=items[4])) else [items[1],str(timedelta(seconds=items[4]))]
                    else:
                        fast_solve[items[0]]=[items[1],str(timedelta(seconds=items[4]))]
            print(fast_solve)
            
        return self.sorted_hard[:30],contest_hard[0:20],fast_solve
           
    def basic_graphs(self):
        if self.user_info.get('status') == 'OK':
            verdicts = {}
            languages = {}
            tags = {}
            ratings = {800: 0}
            indexs={'A':0}
            data={}
            
            for item in self.user_status.get('result'):
                if 'verdict' in item:
                    verdict = item['verdict']
                    verdicts[verdict] = verdicts.get(verdict, 0) + 1
                
                if 'programmingLanguage' in item:
                    language = item['programmingLanguage']
                    languages[language] = languages.get(language, 0) + 1
                
                if 'problem' in item and isinstance(item['problem'], dict):
                    problem = item['problem']
                    if item['verdict'] == 'OK' and 'rating' in problem :
                        rating = problem['rating']
                        ratings[rating] = ratings.get(rating, 0) + 1
                        
                    if 'tags' in problem and isinstance(problem['tags'], list):
                        for tag in problem['tags']:
                            tags[tag] = tags.get(tag, 0) + 1
                    if item['verdict'] =='OK' and 'index' in problem and item['author']['participantType']=='CONTESTANT':
                        index=problem['index'][0]
                        indexs[index]=indexs.get(index,0)+1
            
            data['verdicts']=verdicts
            data['Language']=languages
            data['rating_solved']=ratings
            data['tags']=tags
            data['indexes']=indexs
            return data

    def rating_timeline(self):
        self.rating_list=[]
        self.date_list=[]
        if self.rating_data['status']=='OK':
            for items in self.rating_data['result']:
                self.rating_list.append(items['newRating'])
                self.date_list.append(datetime.utcfromtimestamp(items['ratingUpdateTimeSeconds']).strftime('%Y-%m-%d %H:%M:%S'))
        return self.rating_list,self.date_list
    

    def perf(self):
        delta=[]
        delta.append(self.rating_list[0]*4)
        for i in range(0,len(self.rating_list)-1):
            delta.append(self.rating_list[i]+(self.rating_list[i+1]-self.rating_list[i])*4)
        
        return delta,self.date_list
    

    
def main():
    test=Analyzer("hardikrana439")
    test.get_info()



