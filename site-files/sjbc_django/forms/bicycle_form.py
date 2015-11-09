from django.forms import ModelForm, TextInput, NumberInput, Textarea
from store.bicycle import Bicycle

class BicycleForm(ModelForm):
	class Meta:
		model = Bicycle
		fields = ['sjbc_id', 'manufacturer', 'model', 'serial_number', 'color',
			'ready_for_sale', 'frame_size_inches', 'wheel_size_inches', 'location',
			'sales_tagline', 'initial_assessment', 'work_performed', 'work_to_do',
			'parts_used', 'parts_needed', 'misc_notes'
		]
		widgets = {
            'sjbc_id': TextInput(attrs={'size': 20}),
            'manufacturer': TextInput(attrs={'size': 20}),
            'model': TextInput(attrs={'size': 20}),
            'color': TextInput(attrs={'size': 10}),
            'serial_number': TextInput(attrs={'size': 20}),
            'frame_size_inches': NumberInput(attrs={'size': 4}),
            'wheel_size_inches': NumberInput(attrs={'size': 4}),
            'location': TextInput(attrs={'size': 20}),
            'sales_tagline': Textarea(attrs={'cols': 45, 'rows': 7}),
            'initial_assessment': Textarea(attrs={'cols': 45, 'rows': 7}),
            'work_performed': Textarea(attrs={'cols': 45, 'rows': 7}),
            'work_to_do': Textarea(attrs={'cols': 45, 'rows': 7}),
            'parts_used': Textarea(attrs={'cols': 45, 'rows': 7}),
            'parts_needed': Textarea(attrs={'cols': 45, 'rows': 7}),
            'misc_notes': Textarea(attrs={'cols': 90, 'rows': 4}),
        }
